"use server"

import { createClient } from "@/lib/create-supabase-client"
import { revalidatePath } from "next/cache"

export async function subscribe(formData: FormData) {
  const email = String(formData.get("email"))

  const supabase = createClient()

  const { data, error } = await supabase.from("newsletter").insert({ email }).select()

  if (error) {
    console.log(error)
    return { message: "Error subscribing" }
  }

  revalidatePath("/")
  return { message: "Subscribed!" }
}
