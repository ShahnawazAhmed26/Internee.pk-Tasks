const techInterests = [
  { name: "HTML and CSS", icon: "🌐", description: "Building responsive and modern web applications" },
  { name: "React & Next.js", icon: "⚛️", description: "Full-stack JavaScript development" },
  { name: "Flutter and Dart", icon: "📱", description: "Android Applicaton Development" },
  { name: "N8N", icon: "🤖", description: "AI Agent Development" },
]

export function TechInterests() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Tech Interests</h2>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-lg">
        Passionate about building innovative solutions with cutting-edge technologies
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {techInterests.map((interest) => (
          <div
            key={interest.name}
            className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition group"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{interest.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {interest.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{interest.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
