import React from "react";

export default function JobDescPanel({ jobText, setJobText }) {
  return (
    <div className="panel">
      <div className="h1" style={{ fontSize: 18 }}>2) Job Description</div>
      <div className="p">Paste the role description (requirements + responsibilities).</div>
      <textarea
        className="textarea m1"
        rows="10"
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        placeholder="Paste job description here…"
      />
    </div>
  );
}
