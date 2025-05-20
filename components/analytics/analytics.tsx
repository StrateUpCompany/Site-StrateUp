"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page views
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
    trackPageView(url)
  }, [pathname, searchParams])

  return null
}

// Simple analytics tracking function
function trackPageView(url: string) {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return

  try {
    // You can replace this with your actual analytics implementation
    console.log(`Page view tracked: ${url}`)

    // Example of sending to a hypothetical analytics endpoint
    // This is just a placeholder - replace with your actual analytics code
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
      fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "pageview",
          url,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        }),
        // Use keepalive to ensure the request completes even if the page is being unloaded
        keepalive: true,
      }).catch((error) => {
        console.error("Error sending analytics data:", error)
      })
    }
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}
