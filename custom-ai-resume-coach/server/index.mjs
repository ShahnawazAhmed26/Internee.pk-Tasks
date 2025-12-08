import express from "express";
import cors from "cors";
import { analyze, chat } from "./ai.mjs";

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/health", (_, res) => res.json({ ok: true }));

app.post("/api/analyze", (req, res) => {
  const { resumeText, jobText } = req.body || {};
  return res.json(analyze({ resumeText, jobText }));
});

app.post("/api/chat", (req, res) => {
  const { messages = [], resumeText = "", jobText = "" } = req.body || {};
  return res.json(chat({ messages, resumeText, jobText }));
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`AI server running on http://localhost:${PORT}`);
});
