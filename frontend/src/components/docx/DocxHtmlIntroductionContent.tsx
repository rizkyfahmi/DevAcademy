"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Check, Copy, Play } from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { DocxCopyButton } from "./DocxCopyButton";

interface DocxHtmlIntroductionContentProps {
  onGoHome: () => void;
  onGoNext?: () => void;
}

export function DocxHtmlIntroductionContent({
  onGoHome,
  onGoNext,
}: DocxHtmlIntroductionContentProps) {
  // Interactive state
  const [showLivePreview, setShowLivePreview] = useState(false);

  return (
    <article className="w3-docx-main-content">
      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 1: TITLE, NAV & WHAT IS HTML?                           */}
      {/* ------------------------------------------------------------------ */}
      
      {/* Heading Title Row with Bookmark */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 12 }}>
        <h1 className="w3-docx-page-title">HTML Introduction</h1>
        <DocxBookmarkButton
          tech="HTML"
          chapterSlug="html-introduction"
          title="HTML Introduction"
          url="/learn/html/html-introduction"
        />
      </div>

      {/* Top Action Buttons (< Previous / Next >) */}
      <div className="w3-docx-top-actions" style={{ marginBottom: 20 }}>
        <button
          type="button"
          onClick={onGoHome}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={onGoNext || onGoHome}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>

      <p className="w3-docx-lead-text" style={{ fontSize: 15.5, color: "#19232e" }}>
        HTML is the standard markup language for creating Web pages.
      </p>

      <hr className="w3-docx-divider" style={{ margin: "22px 0 26px" }} />

      {/* What is HTML? */}
      <section className="w3-docx-section">
        <div className="w3-docx-section-header-row">
          <h2 className="w3-docx-section-title" style={{ fontSize: 30 }}>
            What is HTML?
          </h2>
        </div>

        <ul className="w3-docx-bullet-list">
          <li>HTML stands for Hyper Text Markup Language</li>
          <li>HTML is the standard markup language for creating Web pages</li>
          <li>HTML describes the structure of a Web page</li>
          <li>HTML consists of a series of elements</li>
          <li>HTML elements tell the browser how to display the content</li>
          <li>
            HTML elements label pieces of content such as &ldquo;this is a heading&rdquo;,
            &ldquo;this is a paragraph&rdquo;, &ldquo;this is a link&rdquo;, etc.
          </li>
        </ul>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "32px 0" }} />

      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 2: A SIMPLE HTML DOCUMENT & WHAT IS AN HTML ELEMENT?    */}
      {/* ------------------------------------------------------------------ */}
      
      {/* A Simple HTML Document */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 26, marginBottom: 16 }}>
          A Simple HTML Document
        </h2>

        <div className="w3-docx-example-card" style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
            <DocxCopyButton code={`<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>

    <h1>My First Heading</h1>
    <p>My first paragraph.</p>

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
                {"    "}<span style={{ color: "#a51d2d" }}>&lt;h1&gt;</span>My First Heading<span style={{ color: "#a51d2d" }}>&lt;/h1&gt;</span>{"\n"}
                {"    "}<span style={{ color: "#a51d2d" }}>&lt;p&gt;</span>My first paragraph.<span style={{ color: "#a51d2d" }}>&lt;/p&gt;</span>{"\n\n"}
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

    <h1>My First Heading</h1>
    <p>My first paragraph.</p>

  </body>
</html>`)}&ref=/learn/html/html-introduction`}
              className="w3-docx-btn-green"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              <span>Check Preview »</span>
            </Link>
          </div>
        </div>

        {/* Example Explained */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#19232e", marginBottom: 12 }}>
            Example Explained
          </h3>
          <ul className="w3-docx-bullet-list">
            <li>
              The <code className="w3-inline-tag">&lt;!DOCTYPE html&gt;</code> declaration defines that this document is an HTML5 document
            </li>
            <li>
              The <code className="w3-inline-tag">&lt;html&gt;</code> element is the root element of an HTML page
            </li>
            <li>
              The <code className="w3-inline-tag">&lt;head&gt;</code> element contains meta information about the HTML page
            </li>
            <li>
              The <code className="w3-inline-tag">&lt;title&gt;</code> element specifies a title for the HTML page (which is shown in the browser&apos;s title bar or in the page&apos;s tab)
            </li>
            <li>
              The <code className="w3-inline-tag">&lt;body&gt;</code> element defines the document&apos;s body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.
            </li>
            <li>
              The <code className="w3-inline-tag">&lt;h1&gt;</code> element defines a large heading
            </li>
            <li>
              The <code className="w3-inline-tag">&lt;p&gt;</code> element defines a paragraph
            </li>
          </ul>
        </div>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "32px 0" }} />

      {/* What is an HTML Element? */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 26, marginBottom: 14 }}>
          What is an HTML Element?
        </h2>
        <p className="w3-docx-text" style={{ marginBottom: 14 }}>
          An HTML element is defined by a start tag, some content, and an end tag:
        </p>

        <div style={{ background: "#ffffff", border: "1px solid #e3e7eb", padding: "14px 18px", borderRadius: 4, marginBottom: 16 }}>
          <code style={{ fontSize: 15, color: "#a51d2d", fontFamily: "Consolas, Menlo, Monaco, monospace" }}>
            &lt;tagname&gt; Content goes here... &lt;/tagname&gt;
          </code>
        </div>

        <p className="w3-docx-text" style={{ marginBottom: 14 }}>
          The HTML <strong>element</strong> is everything from the start tag to the end tag:
        </p>

        <div style={{ margin: "0 0 16px 8px", fontFamily: "Consolas, Menlo, Monaco, monospace", fontSize: 14.5 }}>
          <div style={{ marginBottom: 6 }}>
            <span style={{ color: "#a51d2d" }}>&lt;h1&gt;</span>My First Heading<span style={{ color: "#a51d2d" }}>&lt;/h1&gt;</span>
          </div>
          <div>
            <span style={{ color: "#a51d2d" }}>&lt;p&gt;</span>My first paragraph.<span style={{ color: "#a51d2d" }}>&lt;/p&gt;</span>
          </div>
        </div>

        {/* Start tag / Element content / End tag Table */}
        <div className="w3-docx-table-container" style={{ margin: "16px 0 20px" }}>
          <table className="w3-docx-table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Start tag</th>
                <th style={{ width: "50%" }}>Element content</th>
                <th style={{ width: "25%" }}>End tag</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code style={{ color: "#a51d2d" }}>&lt;h1&gt;</code>
                </td>
                <td>My First Heading</td>
                <td>
                  <code style={{ color: "#a51d2d" }}>&lt;/h1&gt;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code style={{ color: "#a51d2d" }}>&lt;p&gt;</code>
                </td>
                <td>My first paragraph.</td>
                <td>
                  <code style={{ color: "#a51d2d" }}>&lt;/p&gt;</code>
                </td>
              </tr>
              <tr>
                <td>
                  <code style={{ color: "#a51d2d" }}>&lt;br&gt;</code>
                </td>
                <td>
                  <em>none</em>
                </td>
                <td>
                  <em>none</em>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Yellow Note (Screenshot 2 bottom) */}
        <div className="w3-docx-yellow-banner">
          <strong>Note:</strong> Some HTML elements have no content (like the{" "}
          <code>&lt;br&gt;</code> element). These elements are called <em>empty elements</em>. Empty elements do not have an end tag!
        </div>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "32px 0" }} />

      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 3: WEB BROWSERS & HTML PAGE STRUCTURE                   */}
      {/* ------------------------------------------------------------------ */}
      
      {/* Web Browsers */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 26, marginBottom: 14 }}>
          Web Browsers
        </h2>
        <p className="w3-docx-text" style={{ marginBottom: 10 }}>
          The purpose of a web browser (Chrome, Edge, Firefox, Safari) is to read HTML documents and display them correctly.
        </p>
        <p className="w3-docx-text" style={{ marginBottom: 18 }}>
          A browser does not display the HTML tags, but uses them to determine how to display the document:
        </p>

        {/* Authentic Browser Window Mockup from Screenshot 3 */}
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

      {/* HTML Page Structure */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 26, marginBottom: 14 }}>
          HTML Page Structure
        </h2>
        <p className="w3-docx-text" style={{ marginBottom: 18 }}>
          Below is a visualization of an HTML page structure:
        </p>

        {/* Nested Box Diagram from Screenshot 3 */}
        <div style={{ background: "#e5e7eb", border: "1px solid #9ca3af", padding: "16px", borderRadius: 2, fontFamily: "Consolas, Menlo, Monaco, monospace", fontSize: 13.5, color: "#19232e" }}>
          <div style={{ marginBottom: 8 }}>&lt;html&gt;</div>

          {/* HEAD BOX */}
          <div style={{ background: "#f3f4f6", border: "1px solid #9ca3af", padding: "14px 18px", margin: "0 10px 14px 14px" }}>
            <div style={{ marginBottom: 8 }}>&lt;head&gt;</div>
            <div style={{ background: "#ffffff", border: "1px solid #9ca3af", padding: "8px 14px", margin: "0 10px 8px 14px" }}>
              &lt;title&gt;Page title&lt;/title&gt;
            </div>
            <div>&lt;/head&gt;</div>
          </div>

          {/* BODY BOX */}
          <div style={{ background: "#f3f4f6", border: "1px solid #9ca3af", padding: "16px 18px", margin: "0 10px 10px 14px" }}>
            <div style={{ marginBottom: 10 }}>&lt;body&gt;</div>
            
            <div style={{ background: "#ffffff", border: "1px solid #9ca3af", padding: "8px 14px", margin: "0 10px 8px 14px" }}>
              &lt;h1&gt;This is a heading&lt;/h1&gt;
            </div>
            
            <div style={{ background: "#ffffff", border: "1px solid #9ca3af", padding: "8px 14px", margin: "0 10px 8px 14px" }}>
              &lt;p&gt;This is a paragraph.&lt;/p&gt;
            </div>

            <div style={{ background: "#ffffff", border: "1px solid #9ca3af", padding: "8px 14px", margin: "0 10px 10px 14px" }}>
              &lt;p&gt;This is another paragraph.&lt;/p&gt;
            </div>

            <div>&lt;/body&gt;</div>
          </div>

          <div style={{ marginTop: 8 }}>&lt;/html&gt;</div>
        </div>

        {/* Yellow Note (Screenshot 3 bottom) */}
        <div className="w3-docx-yellow-banner" style={{ marginTop: 20 }}>
          <strong>Note:</strong> The content inside the <code>&lt;body&gt;</code> section will be displayed in a browser. The content inside the <code>&lt;title&gt;</code> element will be shown in the browser&apos;s title bar or in the page&apos;s tab.
        </div>
      </section>

      <hr className="w3-docx-divider" style={{ margin: "32px 0" }} />

      {/* ------------------------------------------------------------------ */}
      {/* SCREENSHOT 4: HTML HISTORY & VIDEO BANNER                          */}
      {/* ------------------------------------------------------------------ */}
      
      {/* HTML History */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title" style={{ fontSize: 26, marginBottom: 14 }}>
          HTML History
        </h2>
        <p className="w3-docx-text" style={{ marginBottom: 18 }}>
          Since the early days of the World Wide Web, there have been many versions of HTML:
        </p>

        {/* Versions Table from Screenshot 4 */}
        <div className="w3-docx-table-container" style={{ margin: "14px 0 20px" }}>
          <table className="w3-docx-table">
            <thead>
              <tr>
                <th style={{ width: 140 }}>Year</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1989</td>
                <td>Tim Berners-Lee invented www</td>
              </tr>
              <tr>
                <td>1991</td>
                <td>Tim Berners-Lee invented HTML</td>
              </tr>
              <tr>
                <td>1993</td>
                <td>Dave Raggett drafted HTML+</td>
              </tr>
              <tr>
                <td>1995</td>
                <td>HTML Working Group defined HTML 2.0</td>
              </tr>
              <tr>
                <td>1997</td>
                <td>W3C Recommendation: HTML 3.2</td>
              </tr>
              <tr>
                <td>1999</td>
                <td>W3C Recommendation: HTML 4.01</td>
              </tr>
              <tr>
                <td>2000</td>
                <td>W3C Recommendation: XHTML 1.0</td>
              </tr>
              <tr>
                <td>2008</td>
                <td>WHATWG HTML5 First Public Draft</td>
              </tr>
              <tr>
                <td>2012</td>
                <td><span style={{ textDecoration: "underline", color: "#19232e" }}>WHATWG HTML5 Living Standard</span></td>
              </tr>
              <tr>
                <td>2014</td>
                <td><span style={{ textDecoration: "underline", color: "#19232e" }}>W3C Recommendation: HTML5</span></td>
              </tr>
              <tr>
                <td>2016</td>
                <td>W3C Candidate Recommendation: HTML 5.1</td>
              </tr>
              <tr>
                <td>2017</td>
                <td><span style={{ textDecoration: "underline", color: "#19232e" }}>W3C Recommendation: HTML5.1 2nd Edition</span></td>
              </tr>
              <tr>
                <td>2017</td>
                <td><span style={{ textDecoration: "underline", color: "#19232e" }}>W3C Recommendation: HTML5.2</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Yellow Note (Screenshot 4 middle) */}
        <div className="w3-docx-yellow-banner" style={{ margin: "20px 0 32px" }}>
          This tutorial follows the latest HTML5 standard.
        </div>
      </section>

      {/* Bottom Nav Row (< Previous / Next >) */}
      <div className="w3-docx-bottom-nav">
        <button
          type="button"
          onClick={onGoHome}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={onGoNext || onGoHome}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>
    </article>
  );
}
