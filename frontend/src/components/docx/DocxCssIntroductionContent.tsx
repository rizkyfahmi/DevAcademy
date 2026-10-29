"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { DocxCopyButton } from "./DocxCopyButton";

interface DocxCssIntroductionContentProps {
  onGoHome: () => void;
  onGoNext?: () => void;
}

export function DocxCssIntroductionContent({
  onGoHome,
  onGoNext,
}: DocxCssIntroductionContentProps) {
  const [showLivePreview, setShowLivePreview] = useState(false);

  return (
    <article className="w3-docx-main-content">
      {/* 1. TITLE & TOP ACTIONS */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 12 }}>
        <h1 className="w3-docx-page-title">CSS Introduction</h1>
        <DocxBookmarkButton
          tech="CSS"
          chapterSlug="css-introduction"
          title="CSS Introduction"
          url="/learn/css/css-introduction"
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
          <Link href="/learn/css/syntax" className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>

      <hr className="w3-docx-divider" />

      {/* 2. WHAT IS CSS? */}
      <section className="w3-docx-section">
        <div className="w3-docx-section-header-row">
          <h2 className="w3-docx-section-title">What is CSS?</h2>
        </div>

        <ul className="w3-docx-bullet-list">
          <li><strong>CSS</strong> stands for <strong>Cascading Style Sheets</strong></li>
          <li>CSS describes <strong>how HTML elements are to be displayed</strong> on screen, paper, or in other media</li>
          <li>CSS <strong>saves a lot of work</strong>. It can control the layout of multiple web pages all at once</li>
          <li>External stylesheets are stored in <strong>CSS files (.css)</strong></li>
        </ul>
      </section>

      <hr className="w3-docx-divider" />

      {/* 3. CSS EXAMPLE & TRY IT YOURSELF */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title">CSS Demo - One HTML Page - Multiple Styles!</h2>
        <p className="w3-docx-text">
          Here we show one HTML page displayed with different stylesheets:
        </p>

        <div className="w3-docx-example-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
            <DocxCopyButton code={`body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}`} variant="action" label="Salin Kode" />
          </div>

          <div className="w3-docx-code-window">
            <pre className="w3-code-snippet">
              <code>
                <span className="code-red">body</span> {"{\n"}
                {"  "}<span className="code-blue">background-color</span>: <span className="code-green">lightblue</span>;{"\n"}
                {"}\n\n"}
                <span className="code-red">h1</span> {"{\n"}
                {"  "}<span className="code-blue">color</span>: <span className="code-green">white</span>;{"\n"}
                {"  "}<span className="code-blue">text-align</span>: <span className="code-green">center</span>;{"\n"}
                {"}\n\n"}
                <span className="code-red">p</span> {"{\n"}
                {"  "}<span className="code-blue">font-family</span>: <span className="code-green">verdana</span>;{"\n"}
                {"  "}<span className="code-blue">font-size</span>: <span className="code-green">20px</span>;{"\n"}
                {"}"}
              </code>
            </pre>
          </div>

          <div className="w3-example-actions">
            <Link
              href={`/tryit?lang=css&code=${encodeURIComponent(`body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}`)}&ref=/learn/css`}
              className="w3-docx-btn-green"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              <span>Check Preview »</span>
            </Link>
          </div>
        </div>
      </section>

      <hr className="w3-docx-divider" />

      {/* 4. WHY USE CSS? */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title">Why Use CSS?</h2>
        <p className="w3-docx-text">
          CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.
        </p>

        <div className="w3-docx-note-box">
          <p>
            <strong>CSS Solved a Big Problem:</strong> HTML was NEVER intended to contain tags for formatting a web page! HTML was created to describe the content of a web page, like <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>. When tags like <code>&lt;font&gt;</code> and color attributes were added to HTML 3.2, it started a nightmare for web developers. To solve this problem, the World Wide Web Consortium (W3C) created CSS.
          </p>
        </div>
      </section>

      <hr className="w3-docx-divider" />

      {/* 5. CSS SAVES A LOT OF WORK */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title">CSS Saves a Lot of Work!</h2>
        <p className="w3-docx-text">
          The style definitions are normally saved in external <code>.css</code> files.
        </p>
        <p className="w3-docx-text">
          With an external stylesheet file, you can change the look of an entire website just by changing one single file!
        </p>

        <div className="w3-docx-table-container">
          <table className="w3-docx-table">
            <thead>
              <tr>
                <th>Styling Method</th>
                <th>Where It Is Written</th>
                <th>Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>External CSS</strong></td>
                <td>Inside a separate <code>.css</code> file linked with <code>&lt;link&gt;</code></td>
                <td>Best practice: styles entire websites efficiently</td>
              </tr>
              <tr>
                <td><strong>Internal CSS</strong></td>
                <td>Inside <code>&lt;style&gt;</code> tags in the <code>&lt;head&gt;</code> section</td>
                <td>Styles a single specific HTML page</td>
              </tr>
              <tr>
                <td><strong>Inline CSS</strong></td>
                <td>Inside the <code>style</code> attribute of an element</td>
                <td>Quick styling for a unique, single HTML element</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="w3-docx-divider" />

      {/* 6. BOTTOM NAV */}
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
          <Link href="/learn/css/syntax" className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>
    </article>
  );
}
