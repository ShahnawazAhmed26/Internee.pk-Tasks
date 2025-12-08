function tokenize(s) {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9+\-#.%\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function unique(arr) {
  return [...new Set(arr)];
}

function extractSkills(text) {
  const known = [
    "react","javascript","typescript","node","express","next","redux","tailwind","css","html",
    "firebase","mongodb","postgres","mysql","git","github","docker","aws","azure","gcp",
    "python","java","c#","agile","scrum"
  ];
  const t = tokenize(text);
  return unique(known.filter(k => t.includes(k)));
}

export function analyze({ resumeText = "", jobText = "" }) {
  const r = resumeText;
  const j = jobText;

  const rTokens = unique(tokenize(r));
  const jTokens = unique(tokenize(j));

  const intersection = rTokens.filter(t => jTokens.includes(t));
  const union = unique([...rTokens, ...jTokens]);
  const keywordMatch = union.length ? Math.round((intersection.length / union.length) * 100) : 0;

  const headings = ["experience", "work experience", "projects", "education", "skills", "summary"];
  const structure = Math.min(100, headings.reduce((acc, h) => acc + (r.includes(h) ? 18 : 0), 0));

  const impactVerbs = ["built", "designed", "led", "improved", "increased", "reduced", "optimized", "implemented", "delivered", "created"];
  const impact = Math.min(
    100,
    Math.round(
      (impactVerbs.filter(v => r.includes(v)).length / impactVerbs.length) * 60 +
      ((r.match(/\d+/g) || []).length) * 2
    )
  );

  const words = tokenize(r).length;
  let clarity = 50;
  if (words >= 250 && words <= 1200) clarity = 90;
  else if (words < 250) clarity = 55;
  else clarity = 65;

  const totalScore = Math.round(keywordMatch * 0.35 + structure * 0.25 + impact * 0.25 + clarity * 0.15);

  const resumeSkills = extractSkills(r);
  const jobSkills = extractSkills(j);

  const missing = jobSkills.filter(s => !resumeSkills.includes(s));

  return {
    scores: { keywordMatch, structure, impact, clarity, totalScore },
    resume: { skills: resumeSkills },
    job: { skills: jobSkills },
    gaps: { missingSkills: missing }
  };
}

export function chat({ messages = [], resumeText = "", jobText = "" }) {
  const last = (messages[messages.length - 1]?.content || "").toLowerCase();
  const a = analyze({ resumeText, jobText });

  if (last.includes("keyword") || last.includes("missing")) {
    return {
      role: "assistant",
      content:
        (a.gaps.missingSkills.length
          ? `Missing high-signal skills (from the job description): ${a.gaps.missingSkills.join(", ")}.`
          : "Nice — your resume already covers the job’s core skills list. Next step: turn them into metric-backed bullets (impact + numbers).")
    };
  }

  if (last.includes("summary") || last.includes("profile")) {
    const top = (a.job.skills.slice(0, 3).join(", ") || "your key skills");
    return {
      role: "assistant",
      content:
        `Try this summary (edit to fit your experience):
` +
        `“Results-driven developer with hands-on experience in ${top}. ` +
        `Delivered measurable improvements through strong execution, clean UI, and reliable delivery. ` +
        `Looking to apply this experience to build high-impact features in a fast-paced team.”`
    };
  }

  if (last.includes("rewrite") || last.includes("improve") || last.includes("bullet")) {
    return {
      role: "assistant",
      content:
        `Rewrite bullets like:
` +
        `• ACTION (built/optimized/implemented) + WHAT (feature/system) + HOW (tools) + RESULT (metric).
` +
        `Example: “Implemented a role-based access system (React + Node) that cut support tickets by 28% in 6 weeks.”`
    };
  }

  return {
    role: "assistant",
    content:
      "Ask me for (1) missing keywords, (2) a stronger summary, or (3) bullet rewrites. If you paste one resume bullet, I can rewrite it in the impact+metric format."
  };
}
