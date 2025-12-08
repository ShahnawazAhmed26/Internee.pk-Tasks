import React, { useEffect, useMemo, useState } from "react";

export default function ChatPanel({ resumeText, jobText }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! Ask for missing keywords, a stronger summary, or bullet rewrites (paste one bullet if you want)."},
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  const canChat = useMemo(() => Boolean(resumeText?.trim()), [resumeText]);

  async function send(userText) {
    if (!userText.trim()) return;
    if (!canChat) {
      setMessages((p) => [...p, { role: "assistant", content: "First upload a resume (then I can coach properly)." }]);
      return;
    }

    const next = [...messages, { role: "user", content: userText }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, resumeText, jobText }),
      });
      const data = await res.json();
      setMessages((p) => [...p, data]);
    } catch (e) {
      setMessages((p) => [...p, { role: "assistant", content: "Something went wrong while generating the reply. Try again." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel">
      <div className="h1" style={{ fontSize: 18 }}>4) Resume Coach (Custom AI Chat)</div>

      <div className="panel" style={{ padding: 12, marginTop: 10, maxHeight: 240, overflow: "auto" }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ marginBottom: 10 }}>
            <div className="text-sm" style={{ color: "#A9B1D6" }}>{m.role === "user" ? "You" : "Coach"}</div>
            <div style={{ whiteSpace: "pre-wrap" }}>{m.content}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
          placeholder="Type: missing keywords / summary / rewrite…"
          disabled={busy}
        />
        <button className="btn" onClick={() => send(input)} disabled={busy || !input.trim()}>
          {busy ? "Thinking…" : "Send"}
        </button>
      </div>
    </div>
  );
}
