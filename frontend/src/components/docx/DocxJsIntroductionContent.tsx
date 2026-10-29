"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { DocxCopyButton } from "./DocxCopyButton";

interface DocxJsIntroductionContentProps {
  onGoHome: () => void;
  onGoNext?: () => void;
}

export function DocxJsIntroductionContent({
  onGoHome,
  onGoNext,
}: DocxJsIntroductionContentProps) {
  // Live interactive demo states
  const [demo1Text, setDemo1Text] = useState("JavaScript can change HTML content.");
  const [demo2Style, setDemo2Style] = useState(false);
  const [demo3Visible, setDemo3Visible] = useState(true);

  return (
    <article className="w3-docx-main-content">
      {/* 1. TITLE & TOP ACTIONS */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 12 }}>
        <h1 className="w3-docx-page-title">JavaScript Introduction</h1>
        <DocxBookmarkButton
          tech="JAVASCRIPT"
          chapterSlug="js-introduction"
          title="JavaScript Introduction"
          url="/learn/javascript/js-introduction"
        />
      </div>

      <div className="w3-docx-top-actions" style={{ marginBottom: 20 }}>
        <button
          type="button"
          onClick={onGoHome}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        {onGoNext ? (
          <button
            type="button"
            onClick={onGoNext}
            className="w3-docx-btn-green"
          >
            Next &gt;
          </button>
        ) : (
          <Link href="/learn/javascript/where-to" className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>

      <hr className="w3-docx-divider" />

      {/* 2. WHAT IS JAVASCRIPT? */}
      <section className="w3-docx-section">
        <div className="w3-docx-section-header-row">
          <h2 className="w3-docx-section-title">What is JavaScript?</h2>
        </div>

        <ul className="w3-docx-bullet-list">
          <li><strong>JavaScript</strong> is the world&apos;s most popular programming language.</li>
          <li>JavaScript is the programming language of the <strong>Web</strong>.</li>
          <li>JavaScript is easy to learn, runs directly in modern browsers, and works on both front-end and back-end (Node.js).</li>
          <li>This tutorial will teach you JavaScript from basic to advanced.</li>
        </ul>
      </section>

      <hr className="w3-docx-divider" />

      {/* 3. WHAT CAN JAVASCRIPT DO? (INTERACTIVE DEMOS) */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title">What Can JavaScript Do?</h2>
        
        {/* DEMO 1 */}
        <h3 className="w3-docx-sub-heading" style={{ marginTop: 18 }}>1. JavaScript Can Change HTML Content</h3>
        <p className="w3-docx-text">
          One of many JavaScript HTML methods is <code>getElementById()</code>. The example below changes the content of an HTML element:
        </p>

        <div className="w3-docx-example-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
            <DocxCopyButton code={`<p id="demo">JavaScript can change HTML content.</p>

<button type="button" onclick='document.getElementById("demo").innerHTML = "Hello JavaScript!"'>
  Click Me!
</button>`} variant="action" label="Salin Kode" />
          </div>

          <div className="w3-docx-code-window">
            <pre className="w3-code-snippet">
              <code>
                <span className="code-red">&lt;p <span className="code-blue">id</span>=<span className="code-green">&quot;demo&quot;</span>&gt;</span>JavaScript can change HTML content.<span className="code-red">&lt;/p&gt;</span>{"\n\n"}
                <span className="code-red">&lt;button <span className="code-blue">type</span>=<span className="code-green">&quot;button&quot;</span> <span className="code-blue">onclick</span>=<span className="code-green">&apos;document.getElementById(&quot;demo&quot;).innerHTML = &quot;Hello JavaScript!&quot;&apos;</span>&gt;</span>{"\n"}
                {"  "}Click Me!{"\n"}
                <span className="code-red">&lt;/button&gt;</span>
              </code>
            </pre>
          </div>

          <div className="w3-docx-live-frame" style={{ marginTop: 14 }}>
            <div className="w3-live-frame-header">
              <span>Interactive Browser Result:</span>
            </div>
            <div className="w3-live-frame-body" style={{ padding: 18, background: "#ffffff" }}>
              <p style={{ fontSize: 16, color: demo1Text.includes("Hello") ? "#04aa6d" : "#1e293b", fontWeight: 600, margin: "0 0 14px" }}>
                {demo1Text}
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setDemo1Text("Hello JavaScript! Content has changed! 🎉")}
                  className="w3-docx-btn-green"
                  style={{ padding: "6px 16px" }}
                >
                  Click Me!
                </button>
                <button
                  type="button"
                  onClick={() => setDemo1Text("JavaScript can change HTML content.")}
                  className="w3-docx-btn-outline"
                  style={{ padding: "6px 14px" }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DEMO 2 */}
        <h3 className="w3-docx-sub-heading" style={{ marginTop: 28 }}>2. JavaScript Can Change HTML Styles (CSS)</h3>
        <p className="w3-docx-text">
          Changing the style of an HTML element is a variant of changing an HTML attribute:
        </p>

        <div className="w3-docx-example-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
            <DocxCopyButton code={`document.getElementById("demo").style.fontSize = "24px";
document.getElementById("demo").style.color = "#04aa6d";`} variant="action" label="Salin Kode" />
          </div>

          <div className="w3-docx-code-window">
            <pre className="w3-code-snippet">
              <code>
                document.getElementById(<span className="code-green">&quot;demo&quot;</span>).style.fontSize = <span className="code-green">&quot;24px&quot;</span>;{"\n"}
                document.getElementById(<span className="code-green">&quot;demo&quot;</span>).style.color = <span className="code-green">&quot;#04aa6d&quot;</span>;
              </code>
            </pre>
          </div>

          <div className="w3-docx-live-frame" style={{ marginTop: 14 }}>
            <div className="w3-live-frame-header">
              <span>Interactive Browser Result:</span>
            </div>
            <div className="w3-live-frame-body" style={{ padding: 18, background: "#ffffff" }}>
              <p
                style={{
                  fontSize: demo2Style ? 24 : 15,
                  color: demo2Style ? "#04aa6d" : "#334155",
                  fontWeight: demo2Style ? 700 : 400,
                  transition: "all 0.2s ease",
                  margin: "0 0 14px",
                }}
              >
                JavaScript can change the style of an HTML element.
              </p>
              <button
                type="button"
                onClick={() => setDemo2Style(!demo2Style)}
                className="w3-docx-btn-green"
                style={{ padding: "6px 16px" }}
              >
                {demo2Style ? "Reset Default Style" : "Change Style with JS"}
              </button>
            </div>
          </div>
        </div>

        {/* DEMO 3 */}
        <h3 className="w3-docx-sub-heading" style={{ marginTop: 28 }}>3. JavaScript Can Hide and Show HTML Elements</h3>
        <p className="w3-docx-text">
          Hiding HTML elements can be done by changing the <code>display</code> style:
        </p>

        <div className="w3-docx-example-card">
          <div className="w3-docx-live-frame">
            <div className="w3-live-frame-header">
              <span>Interactive Browser Result:</span>
            </div>
            <div className="w3-live-frame-body" style={{ padding: 18, background: "#ffffff" }}>
              {demo3Visible ? (
                <div style={{ padding: 14, background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 6, marginBottom: 14, color: "#92400e", fontWeight: 600 }}>
                  JavaScript can hide me using style.display = &apos;none&apos;!
                </div>
              ) : (
                <div style={{ padding: 14, background: "#f1f5f9", borderRadius: 6, marginBottom: 14, color: "#64748b", fontStyle: "italic" }}>
                  (Element is hidden)
                </div>
              )}

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setDemo3Visible(false)}
                  className="w3-docx-btn-outline"
                  style={{ padding: "6px 14px" }}
                >
                  Hide Element
                </button>
                <button
                  type="button"
                  onClick={() => setDemo3Visible(true)}
                  className="w3-docx-btn-green"
                  style={{ padding: "6px 14px" }}
                >
                  Show Element
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="w3-docx-divider" />

      {/* 4. WHERE TO PUT JAVASCRIPT? */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title">Where to Put JavaScript?</h2>
        <p className="w3-docx-text">
          In HTML, JavaScript code is inserted between <code>&lt;script&gt;</code> and <code>&lt;/script&gt;</code> tags.
        </p>

        <div className="w3-docx-note-box">
          <p>
            <strong>Best Practice:</strong> You can place any number of scripts in an HTML document. Scripts can be placed in the <code>&lt;body&gt;</code>, or in the <code>&lt;head&gt;</code> section of an HTML page, or in both. Placing scripts at the bottom of the <code>&lt;body&gt;</code> element improves the display speed, because script compilation can slow down the interpretation.
          </p>
        </div>
      </section>

      <hr className="w3-docx-divider" />

      {/* 5. BOTTOM NAV */}
      <div className="w3-docx-bottom-nav">
        <button
          type="button"
          onClick={onGoHome}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        {onGoNext ? (
          <button
            type="button"
            onClick={onGoNext}
            className="w3-docx-btn-green"
          >
            Next &gt;
          </button>
        ) : (
          <Link href="/learn/javascript/where-to" className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>
    </article>
  );
}
