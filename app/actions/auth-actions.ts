"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { sanitizeInput } from "@/lib/security"
import { hashPassword, verifyPassword, validatePasswordStrength } from "@/lib/password-security"
import { randomBytes } from "crypto"

const MAX_PASSWORD_HISTORY = 5 // Number of previous passwords to remember
const MAX_FAILED_ATTEMPTS = 5 // Number of failed attempts before account lockout
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

export async function createAdminUser(email: string, password: string, role = "admin") {
  try {
    const supabase = createServerSupabaseClient()

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email)

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.message }
    }

    // Create user in auth.users
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: sanitizedEmail,
      password: password,
      email_confirm: true,
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (!authUser.user) {
      return { success: false, error: "Failed to create user" }
    }

    // Hash the password with our custom implementation
    const passwordHash = await hashPassword(password)

    // Add user to admin_users table with password hash
    const { error: adminError } = await supabase.from("admin_users").insert({
      id: authUser.user.id,
      email: sanitizedEmail,
      role: role,
      password_hash: passwordHash,
      password_last_changed: new Date().toISOString(),
    })

    if (adminError) {
      // If there was an error adding to admin_users, delete the auth user
      await supabase.auth.admin.deleteUser(authUser.user.id)
      return { success: false, error: adminError.message }
    }

    // Add the password to password history
    const { error: historyError } = await supabase.from("password_history").insert({
      user_id: authUser.user.id,
      password_hash: passwordHash,
    })

    if (historyError) {
      console.error("Error adding password to history:", historyError)
      // Continue anyway, this is not critical
    }

    return {
      success: true,
      message: "Admin user created successfully",
      userId: authUser.user.id,
    }
  } catch (error) {
    console.error("Error creating admin user:", error)
    return {
      success: false,
      error: "An unexpected error occurred while creating the admin user",
    }
  }
}

export async function signInWithEmailPassword(email: string, password: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email)

    // Check if account is locked
    const { data: userData, error: userError } = await supabase
      .from("admin_users")
      .select("id, failed_login_attempts, account_locked_until")
      .eq("email", sanitizedEmail)
      .single()

    if (userError) {
      // Don't reveal if user exists or not
      return { success: false, error: "Invalid email or password" }
    }

    // Check if account is locked
    if (userData.account_locked_until && new Date(userData.account_locked_until) > new Date()) {
      const unlockTime = new Date(userData.account_locked_until)
      const minutesRemaining = Math.ceil((unlockTime.getTime() - Date.now()) / 60000)
      return {
        success: false,
        error: `Account is locked. Please try again in ${minutesRemaining} minute${minutesRemaining !== 1 ? "s" : ""}.`,
      }
    }

    // Attempt to sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password: password,
    })

    if (error) {
      // Increment failed login attempts
      const newAttempts = (userData.failed_login_attempts || 0) + 1
      const updateData: any = { failed_login_attempts: newAttempts }

      // Lock account if max attempts reached
      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        const lockUntil = new Date(Date.now() + LOCKOUT_DURATION)
        updateData.account_locked_until = lockUntil.toISOString()
      }

      await supabase.from("admin_users").update(updateData).eq("id", userData.id)

      return { success: false, error: "Invalid email or password" }
    }

    // Reset failed login attempts on successful login
    await supabase
      .from("admin_users")
      .update({
        failed_login_attempts: 0,
        account_locked_until: null,
      })
      .eq("id", userData.id)

    return { success: true, data }
  } catch (error) {
    console.error("Error signing in:", error)
    return { success: false, error: "An unexpected error occurred during sign in" }
  }
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Validate password strength
    const passwordValidation = validatePasswordStrength(newPassword)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.message }
    }

    // Get user's current password hash
    const { data: userData, error: userError } = await supabase
      .from("admin_users")
      .select("password_hash")
      .eq("id", userId)
      .single()

    if (userError) {
      return { success: false, error: "User not found" }
    }

    // Verify current password
    const isPasswordValid = await verifyPassword(userData.password_hash, currentPassword)
    if (!isPasswordValid) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Check password history to prevent reuse
    const { data: passwordHistory, error: historyError } = await supabase
      .from("password_history")
      .select("password_hash")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(MAX_PASSWORD_HISTORY)

    if (!historyError && passwordHistory) {
      for (const entry of passwordHistory) {
        if (await verifyPassword(entry.password_hash, newPassword)) {
          return {
            success: false,
            error: `Cannot reuse any of your last ${MAX_PASSWORD_HISTORY} passwords`,
          }
        }
      }
    }

    // Hash the new password
    const newPasswordHash = await hashPassword(newPassword)

    // Update password in Supabase Auth
    const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    // Update password hash in admin_users
    const { error: updateError } = await supabase
      .from("admin_users")
      .update({
        password_hash: newPasswordHash,
        password_last_changed: new Date().toISOString(),
      })
      .eq("id", userId)

    if (updateError) {
      return { success: false, error: updateError.message }
    }

    // Add to password history
    await supabase.from("password_history").insert({
      user_id: userId,
      password_hash: newPasswordHash,
    })

    // Prune password history if needed
    const { count } = await supabase
      .from("password_history")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)

    if (count && count > MAX_PASSWORD_HISTORY) {
      // Delete oldest entries beyond the limit
      const { data: oldestEntries } = await supabase
        .from("password_history")
        .select("id")
        .eq("user_id", userId)
        .order("created_at", { ascending: true })
        .limit(count - MAX_PASSWORD_HISTORY)

      if (oldestEntries && oldestEntries.length > 0) {
        const oldestIds = oldestEntries.map((entry) => entry.id)
        await supabase.from("password_history").delete().in("id", oldestIds)
      }
    }

    return { success: true, message: "Password changed successfully" }
  } catch (error) {
    console.error("Error changing password:", error)
    return { success: false, error: "An unexpected error occurred while changing password" }
  }
}

export async function initiatePasswordReset(email: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Sanitize input
    const sanitizedEmail = sanitizeInput(email)

    // Check if user exists
    const { data: userData, error: userError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("email", sanitizedEmail)
      .single()

    if (userError) {
      // Don't reveal if user exists or not
      return { success: true, message: "If your email is registered, you will receive a password reset link" }
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString("hex")
    const resetExpires = new Date(Date.now() + 3600000) // 1 hour from now

    // Store reset token in database
    await supabase
      .from("admin_users")
      .update({
        password_reset_token: resetToken,
        password_reset_expires: resetExpires.toISOString(),
      })
      .eq("id", userData.id)

    // Send password reset email using Supabase Auth
    await supabase.auth.resetPasswordForEmail(sanitizedEmail, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password?token=${resetToken}`,
    })

    return { success: true, message: "If your email is registered, you will receive a password reset link" }
  } catch (error) {
    console.error("Error initiating password reset:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Validate password strength
    const passwordValidation = validatePasswordStrength(newPassword)
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.message }
    }

    // Find user with this reset token
    const { data: userData, error: userError } = await supabase
      .from("admin_users")
      .select("id, password_reset_expires")
      .eq("password_reset_token", token)
      .single()

    if (userError || !userData) {
      return { success: false, error: "Invalid or expired reset token" }
    }

    // Check if token is expired
    if (!userData.password_reset_expires || new Date(userData.password_reset_expires) < new Date()) {
      return { success: false, error: "Reset token has expired" }
    }

    // Check password history to prevent reuse
    const { data: passwordHistory } = await supabase
      .from("password_history")
      .select("password_hash")
      .eq("user_id", userData.id)
      .order("created_at", { ascending: false })
      .limit(MAX_PASSWORD_HISTORY)

    if (passwordHistory) {
      for (const entry of passwordHistory) {
        if (await verifyPassword(entry.password_hash, newPassword)) {
          return {
            success: false,
            error: `Cannot reuse any of your last ${MAX_PASSWORD_HISTORY} passwords`,
          }
        }
      }
    }

    // Hash the new password
    const newPasswordHash = await hashPassword(newPassword)

    // Update password in Supabase Auth
    const { error: authError } = await supabase.auth.admin.updateUserById(userData.id, {
      password: newPassword,
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    // Update user record
    await supabase
      .from("admin_users")
      .update({
        password_hash: newPasswordHash,
        password_last_changed: new Date().toISOString(),
        password_reset_token: null,
        password_reset_expires: null,
        failed_login_attempts: 0,
        account_locked_until: null,
      })
      .eq("id", userData.id)

    // Add to password history
    await supabase.from("password_history").insert({
      user_id: userData.id,
      password_hash: newPasswordHash,
    })

    return { success: true, message: "Password has been reset successfully" }
  } catch (error) {
    console.error("Error resetting password:", error)
    return { success: false, error: "An unexpected error occurred while resetting password" }
  }
}

export async function checkAdminExists() {
  try {
    const supabase = createServerSupabaseClient()

    const { count, error } = await supabase.from("admin_users").select("*", { count: "exact", head: true })

    if (error) {
      return { success: false, error: error.message }
    }

    return {
      success: true,
      exists: count && count > 0,
    }
  } catch (error) {
    console.error("Error checking if admin exists:", error)
    return {
      success: false,
      error: "An unexpected error occurred while checking if admin exists",
    }
  }
}
