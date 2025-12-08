import React, { useEffect, useMemo, useState } from "react";
import { extractTextFromFile } from "./lib/extractText";
import UploadPanel from "./components/UploadPanel";
import JobDescPanel from "./components/JobDescPanel";
import AnalysisPanel from "./components/AnalysisPanel";
import ChatPanel from "./components/ChatPanel";

export default function App() {
  const [resumeText, setResumeText] = useState("");
  const [resumeMeta, setResumeMeta] = useState(null);
  const [jobText, setJobText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!resumeText) return;
      setLoadingAnalysis(true);
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, jobText }),
        });
        const data = await res.json();
        if (!ignore) setAnalysis(data);
      } catch (e) {
        if (!ignore) setAnalysis(null);
      } finally {
        if (!ignore) setLoadingAnalysis(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [resumeText, jobText]);

  return (
    <div className="container">
      <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div className="h1">AI Resume Analyzer</div>
              <p className="p">Upload resume (PDF/DOCX/TXT) + paste job description → get a score, gap analysis, and a working “AI coach” chat (no API key needed).</p>
            </div>
            <div className="badge"> AI (rule-based) + easy upgrade to LLM</div>
          </div>
        </div>
      </div>

      <div className="grid m2">
        <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
          <UploadPanel
            onParsed={(text, meta) => { setResumeText(text); setResumeMeta(meta); }}
          />
          <JobDescPanel jobText={jobText} setJobText={setJobText} />
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
          <AnalysisPanel analysis={analysis} resumeMeta={resumeMeta} loading={loadingAnalysis} />
          <ChatPanel resumeText={resumeText} jobText={jobText} />
        </div>
      </div>
    </div>
  );
}
