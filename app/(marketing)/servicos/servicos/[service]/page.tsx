import { redirect } from "next/navigation"

export default function ServicePage({ params }: { params: { service: string } }) {
  // Redirect to the main services page with the hash of the specific service
  redirect(`/servicos#${params.service}`)
}
