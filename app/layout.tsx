import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Analytics from "@/components/analytics/analytics"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { LoadingPage } from "@/components/ui/loading"
import '@fortawesome/fontawesome-free/css/all.min.css'
import './diagnostico/styles.css'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StrateUp | Diagnóstico de Maturidade Digital",
  description:
    "Descubra como transformar sua estratégia digital com o diagnóstico personalizado da StrateUp. Resultados mensuráveis para seu negócio.",
  keywords:
    "maturidade digital, estratégia de marketing, diagnóstico empresarial, consultoria estratégica, marketing digital",
  openGraph: {
    title: "StrateUp | Diagnóstico de Maturidade Digital",
    description: "Descubra como transformar sua estratégia digital com o diagnóstico personalizado da StrateUp.",
    images: ["/images/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StrateUp | Diagnóstico de Maturidade Digital",
    description: "Descubra como transformar sua estratégia digital com o diagnóstico personalizado da StrateUp.",
    images: ["/images/twitter-image.jpg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Montserrat:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "StrateUp",
              description: "Consultoria estratégica para transformação digital de negócios",
              url: "https://strateup.com.br",
              logo: "https://strateup.com.br/images/logo.png",
              sameAs: [
                "https://www.facebook.com/strateup",
                "https://www.instagram.com/strateup",
                "https://www.linkedin.com/company/strateup",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              offers: {
                "@type": "Offer",
                name: "Diagnóstico de Maturidade Digital",
                price: "0",
                priceCurrency: "BRL",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Suspense fallback={<LoadingPage />}>
              {children}
            </Suspense>
          </ThemeProvider>
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  )
}
