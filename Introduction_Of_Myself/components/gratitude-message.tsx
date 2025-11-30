import { Heart } from "lucide-react"

export function GratitudeMessage() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800 space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Gratitude</h2>
      </div>

      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
        I want to express my heartfelt thanks to{" "}
        <span className="font-semibold text-emerald-700 dark:text-emerald-400">Internee.pk</span> for providing this
        incredible opportunity to grow as a developer and professional.
      </p>

      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
        Being part of this virtual internship program has allowed me to connect with like-minded individuals, work on
        real-world projects, and develop skills that will shape my career. I'm excited about the journey ahead and
        grateful for the supportive community.
      </p>
    </div>
  )
}
