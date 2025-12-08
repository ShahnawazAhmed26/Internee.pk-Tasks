import React from "react";

export default function AnalysisPanel({ analysis, resumeMeta, loading }) {
  return (
    <div className="panel">
      <div className="h1" style={{ fontSize: 18 }}>3) Analysis & Score</div>
      {!analysis ? (
        <div className="p">Upload a resume (and add a job description for best results).</div>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div className="p" style={{ margin: 0 }}>Overall Match</div>
              <div style={{ fontSize: 30, fontWeight: 900 }}>{analysis.scores.totalScore}/100</div>
            </div>
            <div className="p" style={{ textAlign: "right" }}>
              {resumeMeta?.fileName && <div>File: {resumeMeta.fileName}</div>}
              {resumeMeta?.type && <div>Type: {resumeMeta.type}</div>}
            </div>
          </div>

          <div className="p" style={{ margin: 0 }}>
            Skills (resume): <span className="badge">{(analysis.resume.skills || []).join(", ") || "—"}</span>
          </div>
          <div className="p" style={{ margin: 0 }}>
            Skills (job): <span className="badge">{(analysis.job.skills || []).join(", ") || "—"}</span>
          </div>
          <div className="p" style={{ margin: 0 }}>
            Missing (add these): <span className="badge">{(analysis.gaps.missingSkills || []).join(", ") || "None"}</span>
          </div>

          <div className="p" style={{ marginTop: 10 }}>
            Detail scores: keyword {analysis.scores.keywordMatch} · structure {analysis.scores.structure} ·
            impact {analysis.scores.impact} · clarity {analysis.scores.clarity}
          </div>
        </div>
      )}
      {loading && <div className="text-sm m1">Recomputing score…</div>}
    </div>
  );
}
