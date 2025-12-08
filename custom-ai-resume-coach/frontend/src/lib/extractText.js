import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export async function extractTextFromFile(file) {
  const name = file?.name || "resume";
  const ext = (name.split(".").pop() || "").toLowerCase();

  if (ext === "txt") {
    return { text: await file.text(), meta: { fileName: name, type: "text/plain" } };
  }

  if (ext === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return { text: value, meta: { fileName: name, type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" } };
  }

  if (ext === "pdf") {
    const data = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((it) => it.str).join(" ") + " ";
    }
    return { text, meta: { fileName: name, type: "application/pdf" } };
  }

  throw new Error("Unsupported file type (use PDF, DOCX, or TXT).");
}
