"use client"

import { useEffect, useState } from "react"
import { validateEmail, isValidEmail } from "@/lib/security"

export default function SecurityValidator() {
  const [emailToTest, setEmailToTest] = useState("test@example.com")
  const [isValidWithValidateEmail, setIsValidWithValidateEmail] = useState(false)
  const [isValidWithIsValidEmail, setIsValidWithIsValidEmail] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Test both functions to ensure they work
      setIsValidWithValidateEmail(validateEmail(emailToTest))

      // This will throw an error if isValidEmail is not defined
      if (typeof isValidEmail === "function") {
        setIsValidWithIsValidEmail(isValidEmail(emailToTest))
      } else {
        setError("isValidEmail is not a function")
      }
    } catch (err) {
      setError(`Error validating email: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [emailToTest])

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">Security Module Validator</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Test Email</label>
        <input
          type="text"
          value={emailToTest}
          onChange={(e) => setEmailToTest(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="space-y-2">
        <p>
          <strong>validateEmail result:</strong>{" "}
          <span className={isValidWithValidateEmail ? "text-green-600" : "text-red-600"}>
            {isValidWithValidateEmail ? "Valid" : "Invalid"}
          </span>
        </p>

        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <p>
            <strong>isValidEmail result:</strong>{" "}
            <span className={isValidWithIsValidEmail ? "text-green-600" : "text-red-600"}>
              {isValidWithIsValidEmail ? "Valid" : "Invalid"}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
