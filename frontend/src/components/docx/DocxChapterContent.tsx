"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Check, Copy } from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { DocxCopyButton } from "./DocxCopyButton";
import { getChapterData, getChapterExercise, W3ChapterData, ChapterExercise } from "@/lib/w3-html-chapters-data";
import { getChapterCssData, getChapterCssExercise } from "@/lib/w3-css-chapters-data";
import { getChapterJsData, getChapterJsExercise } from "@/lib/w3-js-chapters-data";
import { getChapterPythonData, getChapterPythonExercise } from "@/lib/w3-python-chapters-data";
import { getChapterSqlData, getChapterSqlExercise } from "@/lib/w3-sql-chapters-data";
import { getUniversalChapterData, getUniversalChapterExercise, normalizeTechKey } from "@/lib/w3-all-courses-catalog";

interface DocxChapterContentProps {
  tech?: string;
  chapterKey: string;
  onNavigate: (chapterSlug: string, subSlug?: string) => void;
}

function CodeHighlighter({ code, tech = "HTML" }: { code: string; tech?: string }) {
  const norm = tech.toUpperCase();

  // HTML Syntax Highlighting
  if (norm === "HTML" || code.trim().startsWith("<!DOCTYPE") || (code.trim().startsWith("<") && (code.includes("</") || code.includes("/>") || code.includes("<!")))) {
    const tokens: React.ReactNode[] = [];
    const regex = /(<!--[\s\S]*?-->)|(<!DOCTYPE[\s\S]*?>)|(<\/?)([a-zA-Z0-9\-]+)((?:\s+[^>]*?)?)(\/?>)|([^<]+)/g;
    let match;
    let keyIdx = 0;

    while ((match = regex.exec(code)) !== null) {
      const [, comment, doctype, tagStart, tagName, tagAttrs, tagEnd, text] = match;

      if (comment) {
        tokens.push(
          <span key={keyIdx++} style={{ color: "#008800", fontStyle: "italic" }}>
            {comment}
          </span>
        );
      } else if (doctype) {
        tokens.push(
          <span key={keyIdx++} style={{ color: "#6a737d", fontWeight: "bold" }}>
            {doctype}
          </span>
        );
      } else if (tagStart && tagName && tagEnd) {
        const attrNodes: React.ReactNode[] = [];
        if (tagAttrs) {
          const attrRegex = /(\s+)([a-zA-Z0-9\-:]+)(?:(=)(".*?"|'.*?'|[^\s>]+))?/g;
          let aMatch;
          let aIdx = 0;
          let lastIndex = 0;
          while ((aMatch = attrRegex.exec(tagAttrs)) !== null) {
            const [, space, aName, eq, aVal] = aMatch;
            attrNodes.push(space);
            attrNodes.push(
              <span key={`attr-${keyIdx}-${aIdx++}`} style={{ color: "#7928ca" }}>
                {aName}
              </span>
            );
            if (eq) {
              attrNodes.push(
                <span key={`eq-${keyIdx}-${aIdx++}`} style={{ color: "#000000" }}>
                  =
                </span>
              );
            }
            if (aVal) {
              attrNodes.push(
                <span key={`val-${keyIdx}-${aIdx++}`} style={{ color: "#0550ae" }}>
                  {aVal}
                </span>
              );
            }
            lastIndex = attrRegex.lastIndex;
          }
          if (lastIndex < tagAttrs.length) {
            attrNodes.push(tagAttrs.slice(lastIndex));
          }
        }

        tokens.push(
          <span key={keyIdx++}>
            <span style={{ color: "#7928ca" }}>{tagStart}</span>
            <span style={{ color: "#a51d2d", fontWeight: 600 }}>{tagName}</span>
            {attrNodes}
            <span style={{ color: "#7928ca" }}>{tagEnd}</span>
          </span>
        );
      } else if (text) {
        tokens.push(<span key={keyIdx++}>{text}</span>);
      }
    }

    return <code>{tokens}</code>;
  }

  // CSS Syntax Highlighting
  if (norm === "CSS" || norm.includes("CSS")) {
    const lines = code.split("\n");
    return (
      <code>
        {lines.map((line, lIdx) => {
          if (line.includes("{")) {
            const [sel, rest] = line.split("{");
            return (
              <span key={lIdx}>
                <span style={{ color: "#a51d2d", fontWeight: 600 }}>{sel}</span>
                <span style={{ color: "#7928ca" }}>{"{"}</span>
                {rest}
                {"\n"}
              </span>
            );
          } else if (line.includes(":") && !line.trim().startsWith("//") && !line.trim().startsWith("/*")) {
            const colonIdx = line.indexOf(":");
            const prop = line.slice(0, colonIdx);
            const val = line.slice(colonIdx + 1);
            return (
              <span key={lIdx}>
                <span style={{ color: "#d73a49" }}>{prop}</span>
                <span style={{ color: "#000000" }}>:</span>
                <span style={{ color: "#0550ae" }}>{val}</span>
                {"\n"}
              </span>
            );
          } else if (line.includes("}")) {
            return (
              <span key={lIdx}>
                <span style={{ color: "#7928ca" }}>{line}</span>
                {"\n"}
              </span>
            );
          }
          return (
            <span key={lIdx}>
              {line}
              {"\n"}
            </span>
          );
        })}
      </code>
    );
  }

  // SQL Highlighting
  if (norm === "SQL" || norm === "MYSQL" || norm === "POSTGRESQL") {
    const tokens: React.ReactNode[] = [];
    const regex = /(--[^\n]*)|('(?:''|[^'])*')|(\b\d+(?:\.\d+)?\b)|(\b(?:SELECT|FROM|WHERE|AND|OR|NOT|ORDER\s+BY|GROUP\s+BY|HAVING|INSERT\s+INTO|VALUES|UPDATE|SET|DELETE|JOIN|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+JOIN|ON|DISTINCT|LIMIT|TOP|COUNT|AVG|SUM|MIN|MAX|LIKE|IN|BETWEEN|AS|IS\s+NULL|IS\s+NOT\s+NULL|CREATE\s+TABLE|DROP\s+TABLE|ALTER\s+TABLE|PRIMARY\s+KEY|FOREIGN\s+KEY|DATABASE|TABLE|INTO|ASC|DESC)\b)|([a-zA-Z_][a-zA-Z0-9_]*)|([^\s\w]+)|(\s+)/gi;
    let match;
    let kIdx = 0;

    while ((match = regex.exec(code)) !== null) {
      const [all, comment, str, num, kw, ident, sym, space] = match;
      if (comment) {
        tokens.push(<span key={kIdx++} style={{ color: "#008800", fontStyle: "italic" }}>{comment}</span>);
      } else if (str) {
        tokens.push(<span key={kIdx++} style={{ color: "#0550ae" }}>{str}</span>);
      } else if (num) {
        tokens.push(<span key={kIdx++} style={{ color: "#098658" }}>{num}</span>);
      } else if (kw) {
        tokens.push(<span key={kIdx++} style={{ color: "#0550ae", fontWeight: 700 }}>{kw.toUpperCase()}</span>);
      } else if (ident) {
        tokens.push(<span key={kIdx++} style={{ color: "#24292e" }}>{ident}</span>);
      } else if (sym || space) {
        tokens.push(<span key={kIdx++}>{all}</span>);
      }
    }
    return <code>{tokens}</code>;
  }

  // Python Highlighting
  if (norm === "PYTHON" || norm === "DJANGO" || norm === "NUMPY" || norm === "PANDAS" || norm === "SCIPY") {
    const tokens: React.ReactNode[] = [];
    const regex = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b(?:def|class|if|elif|else|for|while|break|continue|return|in|not|and|or|import|from|as|try|except|finally|raise|with|lambda|pass|yield|global|nonlocal|async|await)\b)|(\b(?:True|False|None|self|print|len|range|str|int|float|list|dict|set|tuple|type)\b)|([a-zA-Z_][a-zA-Z0-9_]*)|([^\s\w]+)|(\s+)/g;
    let match;
    let kIdx = 0;

    while ((match = regex.exec(code)) !== null) {
      const [all, comment, str, num, kw, builtin, ident, sym, space] = match;
      if (comment) {
        tokens.push(<span key={kIdx++} style={{ color: "#008800", fontStyle: "italic" }}>{comment}</span>);
      } else if (str) {
        tokens.push(<span key={kIdx++} style={{ color: "#0550ae" }}>{str}</span>);
      } else if (num) {
        tokens.push(<span key={kIdx++} style={{ color: "#098658" }}>{num}</span>);
      } else if (kw) {
        tokens.push(<span key={kIdx++} style={{ color: "#d73a49", fontWeight: 600 }}>{kw}</span>);
      } else if (builtin) {
        tokens.push(<span key={kIdx++} style={{ color: "#6f42c1", fontWeight: 600 }}>{builtin}</span>);
      } else if (ident) {
        tokens.push(<span key={kIdx++} style={{ color: "#24292e" }}>{ident}</span>);
      } else if (sym || space) {
        tokens.push(<span key={kIdx++}>{all}</span>);
      }
    }
    return <code>{tokens}</code>;
  }

  // JavaScript / TypeScript / React / Node Highlighting
  if (["JAVASCRIPT", "JS", "TYPESCRIPT", "REACT", "NODEJS", "ANGULAR", "VUE", "JQUERY"].includes(norm)) {
    const tokens: React.ReactNode[] = [];
    const regex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`\\]*(?:\\.[^`\\]*)*`)|(\b\d+(?:\.\d+)?\b)|(\b(?:function|return|const|let|var|if|else|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|class|extends|super|this|new|typeof|instanceof|import|export|from|as|async|await|yield|interface|type)\b)|(\b(?:true|false|null|undefined|console|document|window|Math|Array|Object|String|Number|Boolean|Promise|JSON)\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)|([^\s\w]+)|(\s+)/g;
    let match;
    let kIdx = 0;

    while ((match = regex.exec(code)) !== null) {
      const [all, comment, str, num, kw, builtin, ident, sym, space] = match;
      if (comment) {
        tokens.push(<span key={kIdx++} style={{ color: "#008800", fontStyle: "italic" }}>{comment}</span>);
      } else if (str) {
        tokens.push(<span key={kIdx++} style={{ color: "#0550ae" }}>{str}</span>);
      } else if (num) {
        tokens.push(<span key={kIdx++} style={{ color: "#098658" }}>{num}</span>);
      } else if (kw) {
        tokens.push(<span key={kIdx++} style={{ color: "#d73a49", fontWeight: 600 }}>{kw}</span>);
      } else if (builtin) {
        tokens.push(<span key={kIdx++} style={{ color: "#6f42c1", fontWeight: 600 }}>{builtin}</span>);
      } else if (ident) {
        tokens.push(<span key={kIdx++} style={{ color: "#24292e" }}>{ident}</span>);
      } else if (sym || space) {
        tokens.push(<span key={kIdx++}>{all}</span>);
      }
    }
    return <code>{tokens}</code>;
  }

  // General programming language highlighter (Java, C, C++, C#, PHP, Go, Rust, etc.)
  const tokens: React.ReactNode[] = [];
  const regex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b(?:public|private|protected|static|void|int|float|double|char|bool|boolean|string|String|class|struct|interface|enum|fn|func|package|using|namespace|include|echo|return|if|else|for|while|switch|case|break|continue|new|try|catch|finally)\b)|([a-zA-Z_][a-zA-Z0-9_]*)|([^\s\w]+)|(\s+)/g;
  let match;
  let kIdx = 0;

  while ((match = regex.exec(code)) !== null) {
    const [all, comment, str, num, kw, ident, sym, space] = match;
    if (comment) {
      tokens.push(<span key={kIdx++} style={{ color: "#008800", fontStyle: "italic" }}>{comment}</span>);
    } else if (str) {
      tokens.push(<span key={kIdx++} style={{ color: "#0550ae" }}>{str}</span>);
    } else if (num) {
      tokens.push(<span key={kIdx++} style={{ color: "#098658" }}>{num}</span>);
    } else if (kw) {
      tokens.push(<span key={kIdx++} style={{ color: "#d73a49", fontWeight: 600 }}>{kw}</span>);
    } else if (ident) {
      tokens.push(<span key={kIdx++} style={{ color: "#24292e" }}>{ident}</span>);
    } else if (sym || space) {
      tokens.push(<span key={kIdx++}>{all}</span>);
    }
  }

  return <code>{tokens}</code>;
}

export function DocxChapterContent({
  tech = "HTML",
  chapterKey,
  onNavigate,
}: DocxChapterContentProps) {
  const normalized = normalizeTechKey(tech);
  const chapterData: W3ChapterData = normalized === "CSS" 
    ? getChapterCssData(chapterKey) 
    : normalized === "JAVASCRIPT" 
    ? getChapterJsData(chapterKey) 
    : normalized === "PYTHON"
    ? getChapterPythonData(chapterKey)
    : normalized === "SQL"
    ? getChapterSqlData(chapterKey)
    : normalized === "HTML"
    ? getChapterData(chapterKey)
    : getUniversalChapterData(normalized, chapterKey);

  const exercise = normalized === "CSS"
    ? getChapterCssExercise(chapterKey)
    : normalized === "JAVASCRIPT"
    ? getChapterJsExercise(chapterKey)
    : normalized === "PYTHON"
    ? getChapterPythonExercise(chapterKey)
    : normalized === "SQL"
    ? getChapterSqlExercise(chapterKey)
    : normalized === "HTML"
    ? getChapterExercise(chapterKey)
    : getUniversalChapterExercise(normalized, chapterKey);
  const [openPreviews, setOpenPreviews] = useState<Record<number, boolean>>({});

  const togglePreview = (idx: number) => {
    setOpenPreviews((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handlePrevious = () => {
    if (chapterData.prevSlug === "home") {
      onNavigate("home");
    } else if (chapterData.prevSlug === "introduction") {
      onNavigate("introduction", chapterData.prevSubSlug || "exercises");
    } else {
      onNavigate(chapterData.prevSlug);
    }
  };

  const handleNext = () => {
    if (chapterData.nextSlug === "introduction") {
      onNavigate("introduction", "introduction");
    } else {
      onNavigate(chapterData.nextSlug);
    }
  };

  return (
    <article className="w3-docx-main-content">
      {/* Title & Bookmark */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 12 }}>
        <h1 className="w3-docx-page-title">{chapterData.title}</h1>
        <DocxBookmarkButton
          tech={tech || "HTML"}
          chapterSlug={chapterKey}
          title={chapterData.title}
          url={`/learn/${(tech || "html").toLowerCase()}/${chapterKey}`}
        />
      </div>

      {/* Top Nav Buttons (< Previous / Next >) */}
      <div className="w3-docx-top-actions" style={{ marginBottom: 18 }}>
        <button
          type="button"
          onClick={handlePrevious}
          className="w3-docx-btn-green"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>

      {/* Subtitle */}
      {chapterData.subtitle && (
        <p className="w3-docx-lead-text" style={{ fontSize: 17, marginBottom: 16 }}>
          {chapterData.subtitle}
        </p>
      )}

      <hr className="w3-docx-divider" />

      {/* Render Chapter Sections */}
      {chapterData.sections.map((section, idx) => {
        const isPreviewOpen = !!openPreviews[idx];
        return (
          <section key={section.title + idx} className="w3-docx-section" style={{ marginBottom: 32 }}>
            <h2 className="w3-docx-section-title" style={{ fontSize: 24, marginBottom: 12 }}>
              {section.title}
            </h2>

            {section.lead && (
              <p className="w3-docx-lead-text">{section.lead}</p>
            )}

            {section.paragraphs?.map((p, pIdx) => (
              <p key={pIdx} className="w3-docx-text">
                {p}
              </p>
            ))}

            {section.bullets && (
              <ul className="w3-docx-bullet-list">
                {section.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            )}

            {/* Code Snippet Box */}
            {section.codeSnippet && (
              <div className="w3-docx-example-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
                  <DocxCopyButton code={section.codeSnippet.code} variant="action" label="Salin Kode" />
                </div>
                <div className="w3-docx-code-window">
                  <pre className="w3-code-snippet">
                    <CodeHighlighter code={section.codeSnippet.code} tech={tech} />
                  </pre>
                </div>

                <div className="w3-example-actions">
                  <Link
                    href={`/tryit?lang=${(tech || "html").toLowerCase()}&code=${encodeURIComponent(section.codeSnippet.code)}&ref=${encodeURIComponent(`/learn/${(tech || "html").toLowerCase()}`)}`}
                    className="w3-docx-btn-green"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
                  >
                    <span>Check Preview »</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Table */}
            {section.table && (
              <div className="w3-docx-table-container">
                <table className="w3-docx-table">
                  <thead>
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>
                            {cell.startsWith("<") && cell.endsWith(">") ? (
                              <code>{cell}</code>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Note Box */}
            {section.note && (
              <div className="w3-docx-note-box">
                <p>
                  <strong>Note: </strong>
                  {section.note}
                </p>
              </div>
            )}

            {/* Tip Box */}
            {section.tip && (
              <div className="w3-docx-tip-box">
                <p>
                  <strong>Tip: </strong>
                  {section.tip}
                </p>
              </div>
            )}

            {idx < chapterData.sections.length - 1 && (
              <hr className="w3-docx-divider" />
            )}
          </section>
        );
      })}

      {/* Test Yourself With Exercises Card (Authentic W3Schools) */}
      <div className="w3-docx-exercise-teaser-card">
        <h2 className="w3-docx-exercise-teaser-title">
          Test Yourself With Exercises
        </h2>
        <div className="w3-docx-exercise-teaser-box">
          <p className="w3-docx-exercise-teaser-q">
            <strong>Exercise:</strong> {exercise.question}
          </p>
          <div className="w3-docx-exercise-teaser-actions">
            <button
              type="button"
              onClick={() => onNavigate(chapterKey, "exercises")}
              className="w3-docx-btn-green"
            >
              Start Exercise (3 Soal) &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Nav Buttons (< Previous / Next >) */}
      <div className="w3-docx-top-actions" style={{ marginTop: 40, marginBottom: 20 }}>
        <button
          type="button"
          onClick={handlePrevious}
          className="w3-docx-btn-green"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>
    </article>
  );
}
