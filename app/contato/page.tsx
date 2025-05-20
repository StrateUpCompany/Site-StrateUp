import type { Metadata } from "next"
import ContatoPageClient from "./ContatoPageClient"

export const metadata: Metadata = {
  title: "Contato | StrateUp",
  description:
    "Entre em contato com a StrateUp para transformar sua estratégia digital. Estamos prontos para ajudar sua empresa a alcançar resultados extraordinários.",
  keywords: "contato, consultoria estratégica, transformação digital, atendimento, StrateUp",
}

export default function ContatoPage() {
  return <ContatoPageClient />
}
