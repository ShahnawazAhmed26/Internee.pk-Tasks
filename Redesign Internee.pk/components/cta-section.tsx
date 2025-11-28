"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateEmail(email)) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/10 to-primary/5 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
            Ready to Launch Your Tech Career?
          </h2>
          <p className="text-xl text-foreground/70 text-balance">
            Join thousands of students who've already taken the first step toward their dream internship.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto animate-fade-in-up">
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) validateEmail(e.target.value)
              }}
              onBlur={() => email && validateEmail(email)}
              className={`px-4 py-3 rounded-lg bg-background border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                emailError ? "border-destructive focus:ring-destructive/50" : "border-border hover:border-primary/30"
              }`}
            />
            {emailError && <p className="text-sm text-destructive text-left">{emailError}</p>}
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-95 transition-all duration-200 font-semibold flex items-center gap-2 justify-center group"
          >
            Get Started Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          {submitted && (
            <p className="text-sm text-green-600 dark:text-green-400 animate-fade-in-up">
              ✓ Thanks for signing up! Check your email soon.
            </p>
          )}
        </form>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up">
          <button className="px-8 py-4 bg-background text-foreground border border-border rounded-lg hover:bg-background/80 hover:border-primary/30 active:scale-95 transition-all duration-200 font-semibold">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  )
}
