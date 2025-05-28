"use client"
import ABTest from "@/components/features/ab-testing/ab-test"
import HeroSection from "@/components/features/sections/hero-section"
import HeroSectionAlt from "@/components/features/sections/hero-section-alt"

export default function HeroSectionAB() {
  const trackVariantSelection = (variantId: string) => {
    // In a real implementation, this would send the variant info to your analytics system
    console.log(`A/B Test: User was shown variant ${variantId}`)

    // Example of tracking with Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ab_test_impression", {
        ab_test_id: "hero_section",
        ab_test_variant: variantId,
      })
    }
  }

  return (
    <ABTest
      variants={[
        { id: "original", component: <HeroSection />, weight: 50 },
        { id: "alternative", component: <HeroSectionAlt />, weight: 50 },
      ]}
      onVariantSelected={trackVariantSelection}
    />
  )
}
