"use client"

import { TrendingUp, Users, Briefcase, Award } from "lucide-react"

export default function StatsSection() {
  const stats = [
    { label: "Active Interns", value: "15K+", icon: Users },
    { label: "Job Placements", value: "200K+", icon: Briefcase },
    { label: "Success Rate", value: "95%", icon: TrendingUp },
    { label: "Companies", value: "500+", icon: Award },
  ]

  return (
    <section className="py-16 sm:py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
