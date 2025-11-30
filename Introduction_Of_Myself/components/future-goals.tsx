import { CheckCircle2 } from "lucide-react"

const goals = [
  { goal: "Master Full-Stack Development"},
  { goal: "Master n8n "},
  { goal: "Speak English Fluently"},
]

export function FutureGoals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Future Goals</h2>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-lg">My aspirations for this internship and beyond</p>

      <div className="space-y-3">
        {goals.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-start bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800"
          >
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">{item.goal}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
