"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-card/30 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors duration-300">
                <Sparkles size={16} className="text-primary animate-pulse-soft" />
                <span className="text-sm text-primary font-medium">Launch your tech career today</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold text-foreground leading-tight text-balance">
                Your Dream Internship is One Click Away
              </h1>

              <p className="text-xl text-foreground/70 text-balance">
                Internee.pk connects talented students with industry-leading tech companies. Gain real experience, build
                your network, and launch your career.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200 font-semibold flex items-center gap-2 justify-center group">
                Explore Internships
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="px-8 py-4 bg-card text-foreground border border-border rounded-lg hover:bg-card/80 hover:border-primary/30 active:scale-95 transition-all duration-200 font-semibold">
                Learn More
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="hover:translate-y-[-2px] transition-transform duration-200">
                <p className="text-2xl font-bold text-primary">200K+</p>
                <p className="text-sm text-foreground/70">Students Placed</p>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="hover:translate-y-[-2px] transition-transform duration-200">
                <p className="text-2xl font-bold text-primary">500+</p>
                <p className="text-sm text-foreground/70">Partner Companies</p>
              </div>
            </div>
          </div>

          <div
            className={`relative h-96 md:h-full transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl animate-pulse-soft"></div>
            <div className="relative h-121 bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <Image
                src="/image.png"
                alt="Students collaborating on internship projects"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
