"use client"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import OpportunitiesSection from "@/components/opportunities-section"
import SuccessStoriesSection from "@/components/success-stories-section"
import PartnersSection from "@/components/partners-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <OpportunitiesSection />
        <SuccessStoriesSection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
