"use client"

import { MapPin, DollarSign, Briefcase } from "lucide-react"

export default function OpportunitiesSection() {
  const opportunities = [
    {
      title: "Frontend Developer Intern",
      company: "TechCorp Pakistan",
      location: "Karachi",
      stipend: "PKR 30,000/month",
      duration: "3 months",
      tags: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend Engineer Intern",
      company: "DataFlow Systems",
      location: "Islamabad",
      stipend: "PKR 35,000/month",
      duration: "6 months",
      tags: ["Node.js", "PostgreSQL", "Docker"],
    },
    {
      title: "Full Stack Developer Intern",
      company: "WebScale Solutions",
      location: "Lahore",
      stipend: "PKR 40,000/month",
      duration: "3 months",
      tags: ["Next.js", "MongoDB", "AWS"],
    },
  ]

  return (
    <section id="opportunities" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Trending Opportunities</h2>
            <p className="text-lg text-foreground/70">Explore internships from top tech companies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition group cursor-pointer"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                      {opp.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mt-1">{opp.company}</p>
                  </div>

                  <div className="space-y-2 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-primary/60" />
                      {opp.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-primary/60" />
                      {opp.stipend}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-primary/60" />
                      {opp.duration}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {opp.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition font-medium text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold">
              View All Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
