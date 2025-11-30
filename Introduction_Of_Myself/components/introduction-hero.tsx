import { ArrowRight } from "lucide-react"

export function IntroductionHero() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 text-center space-y-6">
      <div className="space-y-4">
        {/* Name Section */}
        <div className="space-y-2">
         
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
            Shahnawaz Khan
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Nickname:</span> Shah
          </p>
        </div>

        {/* Tagline */}
        <p className="text-2xl text-slate-700 dark:text-slate-300 max-w-2xl mx-auto italic">
          A passionate web and app developer bringing fresh ideas and innovation to every project
        </p>
      </div>



      {/* CTA Button */}
      <div className="pt-8">
        <a
          href="#academic"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition"
        >
          Learn More <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
