"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, Play, RotateCcw } from "lucide-react";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
}

export function LessonCodeLab({ code, language, title }: { code: string; language: string; title: string }) {
  const [draft, setDraft] = useState(code);
  const [rendered, setRendered] = useState(code);
  const [copied, setCopied] = useState(false);
  async function copyCode() {
    try { await navigator.clipboard.writeText(draft); setCopied(true); window.setTimeout(() => setCopied(false), 1400); } catch { setCopied(false); }
  }
  const playgroundHref = "/playground?code=" + encodeURIComponent(draft) + "&language=" + encodeURIComponent(language);
  const previewSource = language === "python"
    ? "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><body style=\"margin:0;padding:16px;background:#17212c;color:#edf3f6;font:13px/1.6 monospace\"><p style=\"margin:0 0 10px;color:#f0c928\">Python is displayed as text; Python in-browser runtime preview.</p><pre style=\"white-space:pre-wrap\">" + escapeHtml(rendered) + "</pre></body></html>"
    : rendered;
  const extension = language === "javascript" ? "js" : language === "python" ? "py" : language;
  return <section className="stack-sm" aria-labelledby="example-heading">
    <div className="panel-head"><div><h2 id="example-heading">Try It Yourself: {title}</h2><p>Edit the code and click Run to test your changes.</p></div><span className="pill">{language.toUpperCase()}</span></div>
    <div className="editor-grid">
      <div className="editor-panel"><div className="editor-bar"><strong>code.{extension}</strong><div className="button-row"><button type="button" className="icon-button" aria-label={copied ? "Code copied" : "Copy code"} onClick={copyCode}>{copied ? <Check /> : <Copy />}</button><button type="button" className="primary-button" onClick={() => setRendered(draft)}><Play />Run</button></div></div><label className="sr-only" htmlFor="lesson-code">Editable example code</label><textarea id="lesson-code" className="editor-textarea" spellCheck={false} value={draft} onChange={(event) => setDraft(event.target.value)} /></div>
      <div className="preview-wrap"><div className="preview-bar"><i className="preview-dot"/><i className="preview-dot"/><i className="preview-dot"/><span style={{marginLeft:8}}>{language === "python" ? "Code view" : "Browser preview"}</span></div><iframe className="preview-frame" title={"Code preview " + title} sandbox="allow-scripts" srcDoc={previewSource} /></div>
    </div>
    <div className="button-row"><Link href={playgroundHref} className="secondary-button">Open in Playground <span aria-hidden="true">↗</span></Link><button className="text-button" type="button" onClick={() => { setDraft(code); setRendered(code); }}><RotateCcw />Reset Code</button></div>
  </section>;
}
