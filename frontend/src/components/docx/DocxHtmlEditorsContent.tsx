"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Check, 
  Copy 
} from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { DocxCopyButton } from "./DocxCopyButton";

interface DocxHtmlEditorsContentProps {
  onGoPrevious: () => void;
  onGoNext: () => void;
}

export function DocxHtmlEditorsContent({
  onGoPrevious,
  onGoNext,
}: DocxHtmlEditorsContentProps) {
  const [showLivePreview, setShowLivePreview] = useState(false);

  return (
    <article className="w3-docx-main-content">
      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 1: TITLE, NAV & LEARN HTML USING NOTEPAD OR TEXTEDIT    */}
      {/* ------------------------------------------------------------------ */}
      
      {/* Title & Bookmark */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 12 }}>
        <h1 className="w3-docx-page-title">HTML Editors</h1>
        <DocxBookmarkButton
          tech="HTML"
          chapterSlug="html-editors"
          title="HTML Editors"
          url="/learn/html/html-editors"
        />
      </div>

      {/* Top Nav Buttons (< Previous / Next >) */}
      <div className="w3-docx-top-actions" style={{ marginBottom: 18 }}>
        <button
          type="button"
          onClick={onGoPrevious}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={onGoNext}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>

      <p className="w3-docx-lead-text" style={{ fontSize: 15.5, color: "#19232e" }}>
        A simple text editor is all you need to learn HTML.
      </p>

      <hr className="w3-docx-divider" style={{ margin: "22px 0 26px" }} />

      {/* Learn HTML Using Notepad or TextEdit */}
      <section className="w3-docx-section">
        <div className="w3-docx-section-header-row">
          <h2 className="w3-docx-section-title" style={{ fontSize: 28 }}>
            Learn HTML Using Notepad or TextEdit
          </h2>
        </div>

        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          Web pages can be created and modified by using professional HTML editors.
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          However, for learning HTML we recommend a simple text editor like Notepad (PC) or TextEdit (Mac).
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          We believe that using a simple text editor is a good way to learn HTML.
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 16px", lineHeight: 1.5 }}>
          Follow the steps below to create your first web page with Notepad or TextEdit.
        </p>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "26px 0" }} />

      {/* Step 1: Open Notepad (PC) */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 24, marginBottom: 14 }}>
          Step 1: Open Notepad (PC)
        </h2>
        
        <p style={{ fontWeight: 700, margin: "0 0 6px", color: "#19232e", fontSize: 14.5 }}>
          Windows 8 or later:
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 14px", lineHeight: 1.5 }}>
          Open the <strong>Start Screen</strong> (the window symbol at the bottom left on your screen). Type <strong>Notepad</strong>.
        </p>

        <p style={{ fontWeight: 700, margin: "0 0 6px", color: "#19232e", fontSize: 14.5 }}>
          Windows 7 or earlier:
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 16px", lineHeight: 1.5 }}>
          Open <strong>Start &gt; Programs &gt; Accessories &gt; Notepad</strong>
        </p>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "26px 0" }} />

      {/* Step 1: Open TextEdit (Mac) */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 24, marginBottom: 14 }}>
          Step 1: Open TextEdit (Mac)
        </h2>

        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          Open <strong>Finder &gt; Applications &gt; TextEdit</strong>
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          Also change some preferences to get the application to save files correctly. In <strong>Preferences &gt; Format &gt;</strong> choose <strong>&ldquo;Plain Text&rdquo;</strong>
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 14px", lineHeight: 1.5 }}>
          Then under &ldquo;Open and Save&rdquo;, check the box that says &ldquo;Display HTML files as HTML code instead of formatted text&rdquo;.
        </p>
        <p style={{ fontWeight: 700, margin: "0 0 16px", color: "#19232e", fontSize: 14.5 }}>
          Then open a new document to place the code.
        </p>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "26px 0" }} />

      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 2: STEP 2: WRITE SOME HTML & NOTEPAD WINDOW MOCKUP      */}
      {/* ------------------------------------------------------------------ */}
      
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 24, marginBottom: 14 }}>
          Step 2: Write Some HTML
        </h2>
        <p className="w3-docx-text" style={{ margin: "0 0 16px", lineHeight: 1.5 }}>
          Write or copy the following HTML code into Notepad:
        </p>

        {/* Code Box */}
        <div style={{ background: "#ffffff", border: "1px solid #e3e7eb", borderRadius: 4, padding: "16px 20px", marginBottom: 20 }}>
          <pre style={{ margin: 0, fontFamily: "Consolas, Menlo, Monaco, monospace", fontSize: 14, lineHeight: 1.5, color: "#19232e" }}>
            <code>
              <span style={{ color: "#999999" }}>&lt;!DOCTYPE html&gt;</span>{"\n"}
              <span style={{ color: "#7928ca" }}>&lt;html&gt;</span>{"\n"}
              <span style={{ color: "#7928ca" }}>&lt;body&gt;</span>{"\n\n"}
              <span style={{ color: "#a51d2d" }}>&lt;h1&gt;</span>My First Heading<span style={{ color: "#a51d2d" }}>&lt;/h1&gt;</span>{"\n\n"}
              <span style={{ color: "#a51d2d" }}>&lt;p&gt;</span>My first paragraph.<span style={{ color: "#a51d2d" }}>&lt;/p&gt;</span>{"\n\n"}
              <span style={{ color: "#7928ca" }}>&lt;/body&gt;</span>{"\n"}
              <span style={{ color: "#7928ca" }}>&lt;/html&gt;</span>
            </code>
          </pre>
        </div>

        {/* Authentic Classic Notepad Window Mockup from Screenshot 2 */}
        <div
          style={{
            maxWidth: 480,
            border: "1px solid #94a3b8",
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
            background: "#ffffff",
            overflow: "hidden",
            marginBottom: 28,
            fontFamily: "Segoe UI, Tahoma, sans-serif",
          }}
        >
          {/* Notepad Title Bar */}
          <div
            style={{
              background: "#ffffff",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e2e8f0",
              fontSize: 12,
              color: "#334155",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 14 }}>📄</span>
              <span>Untitled - Notepad</span>
            </div>
            <div style={{ display: "flex", gap: 10, color: "#64748b", fontSize: 12 }}>
              <span>_</span>
              <span>□</span>
              <span style={{ color: "#ef4444" }}>✕</span>
            </div>
          </div>

          {/* Notepad Menu Bar */}
          <div
            style={{
              background: "#f8fafc",
              padding: "3px 12px",
              display: "flex",
              gap: 14,
              fontSize: 12,
              color: "#334155",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <span>File</span>
            <span>Edit</span>
            <span>Format</span>
            <span>View</span>
            <span>Help</span>
          </div>

          {/* Notepad Text Content */}
          <div
            style={{
              padding: "16px 20px",
              background: "#ffffff",
              fontFamily: "Consolas, Lucida Console, monospace",
              fontSize: 13.5,
              lineHeight: 1.5,
              color: "#000000",
              minHeight: 170,
            }}
          >
            <div>&lt;!DOCTYPE html&gt;</div>
            <div>&lt;html&gt;</div>
            <div>&lt;body&gt;</div>
            <br />
            <div>&lt;h1&gt;My First Heading&lt;/h1&gt;</div>
            <br />
            <div>&lt;p&gt;My first paragraph.&lt;/p&gt;</div>
            <br />
            <div>&lt;/body&gt;</div>
            <div>&lt;/html&gt;|</div>
          </div>
        </div>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "26px 0" }} />

      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 3: STEP 3: SAVE THE HTML PAGE & STEP 4: VIEW IN BROWSER */}
      {/* ------------------------------------------------------------------ */}
      
      {/* Step 3: Save the HTML Page */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 24, marginBottom: 14 }}>
          Step 3: Save the HTML Page
        </h2>
        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          Save the file on your computer. Select <strong>File &gt; Save as</strong> in the Notepad menu.
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 16px", lineHeight: 1.5 }}>
          Name the file <strong>&ldquo;index.htm&rdquo;</strong> and set the encoding to <strong>UTF-8</strong> (which is the preferred encoding for HTML files).
        </p>

        {/* Authentic Save As Dialog Mockup from Screenshot 3 */}
        <div
          style={{
            maxWidth: 580,
            border: "1px solid #94a3b8",
            borderRadius: "6px 6px 0 0",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
            background: "#ffffff",
            overflow: "hidden",
            marginBottom: 20,
            fontFamily: "Segoe UI, Tahoma, sans-serif",
          }}
        >
          {/* Dialog Title Bar */}
          <div
            style={{
              background: "#ffffff",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #cbd5e1",
              fontSize: 12,
              color: "#334155",
            }}
          >
            <span>Save As</span>
            <div style={{ display: "flex", gap: 10, color: "#64748b", fontSize: 12 }}>
              <span>_</span>
              <span>□</span>
              <span style={{ color: "#ef4444" }}>✕</span>
            </div>
          </div>

          {/* Dialog Body Fields */}
          <div style={{ padding: "16px 20px", background: "#f8fafc", fontSize: 12.5, color: "#334155" }}>
            {/* Address Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ color: "#64748b" }}>↑</span>
              <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 3, padding: "3px 10px", flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
                <span>📁</span>
                <span>Desktop</span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ width: 100, color: "#475569" }}>File name:</span>
                <input
                  type="text"
                  readOnly
                  value="index.htm"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #3b82f6",
                    borderRadius: 3,
                    padding: "3px 8px",
                    width: 240,
                    fontSize: 12.5,
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ width: 100, color: "#475569" }}>Save as type:</span>
                <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 3, padding: "3px 8px", width: 240 }}>
                  All Files (*.*)
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#475569" }}>Encoding:</span>
                  <div style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: 3, padding: "3px 8px", minWidth: 90 }}>
                    UTF-8
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button type="button" style={{ background: "#e2e8f0", border: "1px solid #cbd5e1", padding: "4px 18px", borderRadius: 3, fontSize: 12, cursor: "default" }}>
                    Save
                  </button>
                  <button type="button" style={{ background: "#e2e8f0", border: "1px solid #cbd5e1", padding: "4px 18px", borderRadius: 3, fontSize: 12, cursor: "default" }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yellow Tip Banner (Screenshot 3 middle) */}
        <div className="w3-docx-yellow-banner" style={{ margin: "16px 0 28px" }}>
          <strong>Tip:</strong> You can use either .htm or .html as file extension. There is no difference; it is up to you.
        </div>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "26px 0" }} />

      {/* Step 4: View the HTML Page in Your Browser */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 24, marginBottom: 14 }}>
          Step 4: View the HTML Page in Your Browser
        </h2>
        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          Open the saved HTML file in your favorite browser (double click on the file, or right-click - and choose &ldquo;Open with&rdquo;).
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 18px", lineHeight: 1.5 }}>
          The result will look much like this:
        </p>

        {/* Browser Mockup from Screenshot 3 */}
        <div className="w3-browser-window-mockup" style={{ maxWidth: 640 }}>
          <div className="w3-browser-header" style={{ background: "#e5e7eb", padding: "6px 12px", borderBottom: "1px solid #cbd5e1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ background: "#ffffff", padding: "3px 14px", borderRadius: "4px 4px 0 0", fontSize: 12, fontWeight: 500, color: "#374151", border: "1px solid #cbd5e1", borderBottom: "none" }}>
                index.htm
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10, color: "#6b7280", fontSize: 12 }}>
              <span>_</span>
              <span>□</span>
              <span>✕</span>
            </div>
          </div>
          <div style={{ background: "#f3f4f6", padding: "5px 12px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #e5e7eb" }}>
            <span style={{ color: "#9ca3af", fontSize: 14 }}>←</span>
            <span style={{ color: "#9ca3af", fontSize: 14 }}>→</span>
            <span style={{ color: "#9ca3af", fontSize: 14 }}>↻</span>
            <div style={{ background: "#ffffff", border: "1px solid #d1d5db", borderRadius: 3, padding: "2px 10px", fontSize: 11.5, color: "#374151", flex: 1 }}>
              file:///C:/Users/myuser/Desktop/index.htm
            </div>
          </div>
          <div className="w3-browser-viewport" style={{ padding: "24px 30px", fontFamily: "Times New Roman, Times, serif" }}>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 10px", color: "#000000" }}>
              My First Heading
            </h1>
            <p style={{ margin: 0, color: "#000000", fontSize: 16 }}>
              My first paragraph.
            </p>
          </div>
        </div>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "32px 0" }} />

      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 4: W3SCHOOLS ONLINE EDITOR - "TRY IT YOURSELF"          */}
      {/* ------------------------------------------------------------------ */}
      
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 26, marginBottom: 14 }}>
          DevAcademy Online Editor - &ldquo;Try it Yourself&rdquo;
        </h2>
        <p className="w3-docx-text" style={{ margin: "0 0 10px", lineHeight: 1.5 }}>
          With our free online editor, you can edit the HTML code and view the result in your browser.
        </p>
        <p className="w3-docx-text" style={{ margin: "0 0 18px", lineHeight: 1.5 }}>
          It is the perfect tool when you want to <strong>test</strong> code fast. It also has color coding and the ability to save and share code with others:
        </p>

        {/* Example Box */}
        <div className="w3-docx-example-card" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
            <DocxCopyButton code={`<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>

    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>

  </body>
</html>`} variant="action" label="Salin Kode" />
          </div>

          <div className="w3-docx-code-window" style={{ background: "#ffffff", padding: "16px 20px" }}>
            <pre className="w3-code-snippet" style={{ color: "#000000", fontFamily: "Consolas, Menlo, Monaco, monospace", fontSize: 14, lineHeight: 1.5 }}>
              <code>
                <span style={{ color: "#999999" }}>&lt;!DOCTYPE html&gt;</span>{"\n"}
                <span style={{ color: "#7928ca" }}>&lt;html&gt;</span>{"\n"}
                {"  "}<span style={{ color: "#7928ca" }}>&lt;head&gt;</span>{"\n"}
                {"    "}<span style={{ color: "#7928ca" }}>&lt;title&gt;</span>Page Title<span style={{ color: "#7928ca" }}>&lt;/title&gt;</span>{"\n"}
                {"  "}<span style={{ color: "#7928ca" }}>&lt;/head&gt;</span>{"\n"}
                {"  "}<span style={{ color: "#7928ca" }}>&lt;body&gt;</span>{"\n\n"}
                {"    "}<span style={{ color: "#a51d2d" }}>&lt;h1&gt;</span>This is a Heading<span style={{ color: "#a51d2d" }}>&lt;/h1&gt;</span>{"\n"}
                {"    "}<span style={{ color: "#a51d2d" }}>&lt;p&gt;</span>This is a paragraph.<span style={{ color: "#a51d2d" }}>&lt;/p&gt;</span>{"\n\n"}
                {"  "}<span style={{ color: "#7928ca" }}>&lt;/body&gt;</span>{"\n"}
                <span style={{ color: "#7928ca" }}>&lt;/html&gt;</span>
              </code>
            </pre>
          </div>

          <div className="w3-example-actions" style={{ padding: "14px 20px" }}>
            <Link
              href={`/tryit?lang=html&code=${encodeURIComponent(`<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>

    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>

  </body>
</html>`)}&ref=/learn/html/html-editors`}
              className="w3-docx-btn-green"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              <span>Check Preview »</span>
            </Link>
          </div>
        </div>

        <p className="w3-docx-hint-text" style={{ margin: "10px 0 28px", color: "#374151", fontWeight: 600 }}>
          Click on the &ldquo;Try it Yourself&rdquo; button to see how it works.
        </p>
      </section>



      {/* Bottom Nav Row (< Previous / Next >) */}
      <div className="w3-docx-bottom-nav">
        <button
          type="button"
          onClick={onGoPrevious}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={onGoNext}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>
    </article>
  );
}
