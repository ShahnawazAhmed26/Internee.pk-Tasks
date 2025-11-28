"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer">
            internee.pk
          </div>

          <div className="hidden md:flex gap-8">
            <a
              href="#opportunities"
              className="text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              Internships
            </a>
            <a href="#stories" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
              Success Stories
            </a>
            <a href="#partners" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
              Partners
            </a>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 text-foreground hover:text-primary transition-colors duration-200">
            Sign In
          </button>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200 font-medium">
            Browse Jobs
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground transition-transform duration-200 hover:scale-110"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-card border-b border-border animate-slide-in-left">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#opportunities"
              className="block text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              Internships
            </a>
            <a
              href="#stories"
              className="block text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              Success Stories
            </a>
            <a
              href="#partners"
              className="block text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              Partners
            </a>
            <button className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200 font-medium mt-4">
              Browse Jobs
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
