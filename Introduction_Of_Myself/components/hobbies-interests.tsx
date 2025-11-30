import { Heart } from "lucide-react"

const hobbies = [
  "Scratch NO CODE Programming",
  "3D Models with Blender",
  "Dota 2 Workshop Tools customizations",
  "Video Edits with Wondershare Filmora",
]

export function HobbiesInterests() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Hobbies & Interests</h2>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-lg">
        Beyond the code, I enjoy a diverse range of activities that keep me inspired and connected
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hobbies.map((hobby) => (
          <div
            key={hobby}
            className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800"
          >
            <Heart className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">{hobby}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
