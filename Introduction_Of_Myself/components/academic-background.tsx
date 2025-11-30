import { BookOpen } from "lucide-react"

export function AcademicBackground() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Academic Background</h2>
      </div>

      <div className="space-y-6 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
        {/* Education Item */}
        <div className="relative pl-8 pb-8">
          <div className="absolute -left-5 top-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center border-4 border-slate-50 dark:border-slate-950">
            <BookOpen className="w-4 h-4 text-white" />
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-50 text-lg">Cambridge IGCSE Candidate</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">Study</p>
              </div>
              <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full">
                Current
              </span>
            </div>
          </div>
        </div>
      </div>

   
    </div>
  )
}
