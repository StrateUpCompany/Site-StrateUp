"use server"

import { createClient } from "@/lib/create-supabase-client"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export async function addContact(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Contact.",
    }
  }

  const { name, email, message } = validatedFields.data

  try {
    const supabase = createClient()
    const { error } = await supabase.from("contacts").insert({ name, email, message })

    if (error) {
      console.error("Supabase error:", error)
      return { message: "Failed to create contact - Supabase error" }
    }
  } catch (e) {
    console.error("Error:", e)
    return { message: "Failed to create contact - Generic error" }
  }

  revalidatePath("/")
  return { message: "Contact created successfully" }
}
