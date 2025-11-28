"use client"

export default function PartnersSection() {
  return (
    <section id="partners" className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Trusted By</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">500+ Companies Partner With Us</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
            {[
              "Google",
              "Microsoft",
              "Amazon",
              "Facebook",
              "Apple",
              "Tesla",
              "Uber",
              "Airbnb",
              "Netflix",
              "Spotify",
            ].map((company, index) => (
              <div
                key={index}
                className="px-6 py-4 bg-card border border-border rounded-lg text-foreground/60 font-semibold hover:border-primary/50 transition"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
