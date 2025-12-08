import React, { useRef, useState } from "react";
import { extractTextFromFile } from "../lib/extractText";

export default function UploadPanel({ onParsed }) {
  const inputRef = useRef(null);
  const [status, setStatus] = useState("Pick a resume file (PDF/DOCX/TXT).");
  const [busy, setBusy] = useState(false);

  async function onPick(file) {
    if (!file) return;
    setBusy(true);
    setStatus(`Parsing: ${file.name}…`);
    try {
      const { text, meta } = await extractTextFromFile(file);
      onParsed(text, meta);
      setStatus("Parsed ✅ Now paste the job description on the right.");
    } catch (e) {
      setStatus("Parse failed — please try another file type (PDF/DOCX/TXT).");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div>
          <div className="h1" style={{ fontSize: 18 }}>1) Resume Upload</div>
          <div className="p">Extracts raw text for scoring + coaching.</div>
        </div>
        <button className="btn" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? "Parsing…" : "Choose file"}
        </button>
      </div>
      <div className="text-sm m1">{status}</div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        style={{ display: "none" }}
        onChange={(e) => onPick(e.target.files?.[0] || null)}
      />
    </div>
  );
}
