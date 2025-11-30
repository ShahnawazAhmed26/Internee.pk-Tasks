import { Github, Linkedin, Twitter, Mail, Facebook } from "lucide-react"

const socialLinks = [
  { icon: Github, label: "GitHub", url: "#" },
  { icon: Linkedin, label: "LinkedIn", url: "#" },
  { icon: Facebook, label: "Facebook", url: "#" },
  { icon: Mail, label: "Email", url: "#" },
]

export function SocialLinks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-emerald-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Connect With Me</h2>
      </div>

      <div className="flex flex-wrap gap-4">
        {socialLinks.map((social) => {
          const Icon = social.icon
          return (
            <a
              key={social.label}
              href={social.url}
              className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-700 transition"
            >
              <Icon className="w-5 h-5" />
              <span>{social.label}</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
