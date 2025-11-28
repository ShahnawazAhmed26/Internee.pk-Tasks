"use client"

import { Star } from "lucide-react"

export default function SuccessStoriesSection() {
  const stories = [
    {
      name: "Ahmed Hassan",
      role: "Now Senior Developer at Google",
      company: "Started at TechCorp",
      quote:
        "Internee.pk gave me the platform to showcase my skills. The mentorship and real-world experience transformed my career.",
      rating: 5,
      image: "👨‍💼",
    },
    {
      name: "Fatima Khan",
      role: "Product Manager at Microsoft",
      company: "Started at DataFlow",
      quote:
        "The internship opportunities and professional network I built through internee.pk were invaluable. Highly recommended!",
      rating: 5,
      image: "👩‍💼",
    },
    {
      name: "Ali Raza",
      role: "Founder of TechStartup",
      company: "Started at WebScale",
      quote:
        "Not only did I gain technical skills, but I also learned business fundamentals. The platform connects you with the right people.",
      rating: 5,
      image: "👨‍💻",
    },
  ]

  return (
    <section id="stories" className="py-16 sm:py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Success Stories</h2>
            <p className="text-lg text-foreground/70">See how our interns transformed their careers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <div key={index} className="bg-background rounded-xl border border-border p-6 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{story.image}</div>
                  <div className="flex gap-1">
                    {Array(story.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} size={16} className="fill-primary text-primary" />
                      ))}
                  </div>
                </div>

                <p className="text-foreground/80 flex-1 mb-4 text-sm leading-relaxed">"{story.quote}"</p>

                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{story.name}</p>
                  <p className="text-sm text-primary font-medium">{story.role}</p>
                  <p className="text-xs text-foreground/60 mt-1">{story.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
