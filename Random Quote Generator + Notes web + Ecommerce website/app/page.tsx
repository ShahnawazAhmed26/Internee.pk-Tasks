"use client"

import { useState } from "react"
import QuoteGallerySection from "@/components/sections/quote-gallery-section"
import NotesSection from "@/components/sections/notes-section"
import EcommerceSection from "@/components/sections/ecommerce-section"
import { Sparkles, Sticker as Sticky, ShoppingCart } from "lucide-react"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"quotes" | "notes" | "ecommerce">("quotes")

  const tabs = [
    { id: "quotes", label: "Quotes & Gallery", icon: Sparkles },
    { id: "notes", label: "Notes", icon: Sticky },
    { id: "ecommerce", label: "Shop", icon: ShoppingCart },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">MultiTask Hub</h1>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">All your tools in one place</div>
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                Admin Mode
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === "quotes" && <QuoteGallerySection />}
        {activeTab === "notes" && <NotesSection />}
        {activeTab === "ecommerce" && <EcommerceSection />}
      </main>
    </div>
  )
}
