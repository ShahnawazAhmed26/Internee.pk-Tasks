"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MessageSquare, User } from "lucide-react"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 animate-fade-in-up">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <User size={16} className="text-primary" />
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={`w-full px-4 py-3 rounded-lg bg-card border transition-all duration-200 focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-destructive focus:ring-destructive/50"
              : "border-border hover:border-primary/30 focus:ring-primary/50"
          }`}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Mail size={16} className="text-primary" />
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={`w-full px-4 py-3 rounded-lg bg-card border transition-all duration-200 focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-destructive focus:ring-destructive/50"
              : "border-border hover:border-primary/30 focus:ring-primary/50"
          }`}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-foreground">
          <MessageSquare size={16} className="text-primary" />
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your inquiry..."
          rows={4}
          className={`w-full px-4 py-3 rounded-lg bg-card border transition-all duration-200 focus:outline-none focus:ring-2 resize-none ${
            errors.message
              ? "border-destructive focus:ring-destructive/50"
              : "border-border hover:border-primary/30 focus:ring-primary/50"
          }`}
        />
        {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {/* Success Message */}
      {submitSuccess && (
        <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg text-green-600 dark:text-green-400 text-sm animate-fade-in-up">
          ✓ Thank you! We've received your message and will get back to you soon.
        </div>
      )}
    </form>
  )
}
