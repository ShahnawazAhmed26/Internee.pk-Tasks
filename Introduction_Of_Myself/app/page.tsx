import { IntroductionHero } from "@/components/introduction-hero"
import { AcademicBackground } from "@/components/academic-background"
import { TechInterests } from "@/components/tech-interests"
import { HobbiesInterests } from "@/components/hobbies-interests"
import { GratitudeMessage } from "@/components/gratitude-message"
import { FutureGoals } from "@/components/future-goals"
import { SocialLinks } from "@/components/social-links"



export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      
      </nav>

      {/* Hero Section */}
      <div className="pt-20">
        <IntroductionHero />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
        {/* Left sidebar navigation - visible on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-20">
            <section id="academic">
              <AcademicBackground />
            </section>

            <section id="interests">
              <TechInterests />
            </section>

            <section id="hobbies">
              <HobbiesInterests />
            </section>

            <section id="goals">
              <FutureGoals />
            </section>

            <section>
              <GratitudeMessage />
            </section>

            <section className="border-t border-slate-200 dark:border-slate-800 pt-12">
              <SocialLinks />
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
     
    </main>
  )
}
