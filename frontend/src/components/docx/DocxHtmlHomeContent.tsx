"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Check, 
  ChevronRight, 
  Copy, 
  ExternalLink, 
  Sparkles,
  Smartphone
} from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { DocxCopyButton } from "./DocxCopyButton";
import { useAuthModal } from "@/context/AuthModalContext";

interface DocxHtmlHomeContentProps {
  onGoNext?: () => void;
  onSelectChapter?: (slug: string) => void;
}

export function DocxHtmlHomeContent({ onGoNext, onSelectChapter }: DocxHtmlHomeContentProps = {}) {
  const { openSignIn } = useAuthModal();

  // Exercise state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);

  // Live code runner state
  const [showLivePreview, setShowLivePreview] = useState(false);

  const starterHtmlCode = `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>

  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>

</body>
</html>`;

  const htmlHomeExampleCode = starterHtmlCode;

  const handleExerciseSubmit = () => {
    if (!selectedAnswer) return;
    setExerciseSubmitted(true);
  };

  const referenceList = [
    { title: "HTML Elements", slug: "tag-list", href: "/learn/html/tag-list" },
    { title: "Browser Support", slug: "browser-support", href: "/learn/html/browser-support" },
    { title: "Attributes", slug: "ref-attributes", href: "/learn/html/ref-attributes" },
    { title: "Global Attributes", slug: "global-attributes", href: "/learn/html/global-attributes" },
    { title: "Event Attributes", slug: "event-attributes", href: "/learn/html/event-attributes" },
    { title: "Color Names", slug: "ref-colors", href: "/learn/html/ref-colors" },
    { title: "Canvas", slug: "ref-canvas", href: "/learn/html/ref-canvas" },
    { title: "Audio/Video DOM", slug: "audio-video-ref", href: "/learn/html/audio-video-ref" },
    { title: "Character Sets", slug: "character-sets", href: "/learn/html/character-sets" },
    { title: "URL Encoding", slug: "ref-url-encode", href: "/learn/html/ref-url-encode" },
    { title: "Language Codes", slug: "language-codes", href: "/learn/html/language-codes" },
    { title: "Country Codes", slug: "country-codes", href: "/learn/html/country-codes" },
    { title: "HTTP Messages", slug: "status-codes", href: "/learn/html/status-codes" },
    { title: "Px to Em Converter", slug: "px-to-em", href: "/learn/html/px-to-em" },
    { title: "Keyboard Shortcuts", slug: "keyboard-shortcuts", href: "/learn/html/keyboard-shortcuts" },
  ];

  return (
    <article className="w3-docx-main-content">
      {/* ------------------------------------------------------------------ */}
      {/* 1. TOP NAV ROW & TITLE (Screenshot 2)                              */}
      {/* ------------------------------------------------------------------ */}
      <div className="w3-docx-top-actions" style={{ justifyContent: "flex-end" }}>
        {onGoNext ? (
          <button type="button" onClick={onGoNext} className="w3-docx-btn-green">
            Next &gt;
          </button>
        ) : (
          <Link href="/learn/html/introduction" className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>

      <div className="w3-docx-header-title-row">
        <h1 className="w3-docx-page-title">HTML Tutorial</h1>
        <DocxBookmarkButton
          tech="HTML"
          chapterSlug="home"
          title="HTML Tutorial"
          url="/learn/html"
        />
      </div>

      {/* 2. HERO BANNER: LEARN HTML */}
      <div className="w3-docx-hero-banner">
        <div className="w3-docx-hero-left">
          <div className="w3-docx-html-badge">
            <span className="w3-html5-shield">HTML5</span>
            <h2 className="w3-docx-learn-heading">Learn HTML</h2>
          </div>
          <p className="w3-docx-lead-text">
            HTML is the standard markup language for Web pages.
          </p>
          <p className="w3-docx-lead-text">
            With HTML you can create your own Website.
          </p>
          <p className="w3-docx-lead-text">
            HTML is easy to learn - You will enjoy it!
          </p>

          {onGoNext ? (
            <button type="button" onClick={onGoNext} className="w3-docx-btn-green w3-docx-cta-now">
              <span>Learn HTML now &gt;</span>
            </button>
          ) : (
            <Link href="/learn/html/introduction" className="w3-docx-btn-green w3-docx-cta-now">
              <span>Learn HTML now &gt;</span>
            </Link>
          )}
        </div>
      </div>

      <hr className="w3-docx-divider" />

      {/* ------------------------------------------------------------------ */}
      {/* 3. LEARNING BY EXAMPLES (Screenshot 3)                             */}
      {/* ------------------------------------------------------------------ */}
      <section className="w3-docx-section">
        <div className="w3-docx-section-header-row">
          <h2 className="w3-docx-section-title">Learning by Examples</h2>
        </div>

        <p className="w3-docx-text">
          With our &ldquo;Try it Yourself&rdquo; editor, you can edit the HTML code and view the result in the browser:
        </p>

        {/* Example Box */}
        <div className="w3-docx-example-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
            <DocxCopyButton code={htmlHomeExampleCode} variant="action" label="Salin Kode" />
          </div>

          <div className="w3-docx-code-window">
            <pre className="w3-code-snippet">
              <code>
                <span className="code-gray">&lt;!DOCTYPE html&gt;</span>{"\n"}
                <span className="code-red">&lt;html&gt;</span>{"\n"}
                {"  "}<span className="code-red">&lt;head&gt;</span>{"\n"}
                {"    "}<span className="code-red">&lt;title&gt;</span>Page Title<span className="code-red">&lt;/title&gt;</span>{"\n"}
                {"  "}<span className="code-red">&lt;/head&gt;</span>{"\n"}
                {"  "}<span className="code-red">&lt;body&gt;</span>{"\n\n"}
                {"    "}<span className="code-red">&lt;h1&gt;</span>This is a Heading<span className="code-red">&lt;/h1&gt;</span>{"\n"}
                {"    "}<span className="code-red">&lt;p&gt;</span>This is a paragraph.<span className="code-red">&lt;/p&gt;</span>{"\n\n"}
                {"  "}<span className="code-red">&lt;/body&gt;</span>{"\n"}
                <span className="code-red">&lt;/html&gt;</span>
              </code>
            </pre>
          </div>

          <div className="w3-example-actions">
            <Link
              href={`/tryit?lang=html&code=${encodeURIComponent(htmlHomeExampleCode)}&ref=/learn/html`}
              className="w3-docx-btn-green"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              <span>Check Preview »</span>
            </Link>
          </div>
        </div>

        <p className="w3-docx-hint-text">
          Click on the &ldquo;Try it Yourself&rdquo; button to see how it works.
        </p>

        {/* HTML Examples Subsection */}
        <div className="w3-docx-sub-block">
          <h3 className="w3-docx-sub-heading">HTML Examples</h3>
          <p className="w3-docx-text">
            This tutorial supplements all explanations with clarifying examples.
          </p>
          <Link href="/playground" className="w3-docx-btn-gray">
            See all HTML Examples
          </Link>
        </div>
      </section>

      <hr className="w3-docx-divider" />

      {/* ------------------------------------------------------------------ */}
      {/* 4. HTML EXERCISES & QUIZ TEST (Screenshot 4)                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title">HTML Exercises</h2>
        <p className="w3-docx-text">
          Many chapters in this tutorial end with an exercise where you can check your level of knowledge.
        </p>

        {/* Interactive Dark Exercise Card */}
        <div className="w3-docx-exercise-dark-card">
          <div className="w3-exercise-badge">
            <span>Exercise</span>
            <span className="w3-exercise-qmark" title="Select the best answer">?</span>
          </div>

          <h3 className="w3-exercise-question">
            What is a correct syntax for an HTML hyperlink?
          </h3>

          <div className="w3-exercise-options-list">
            <label className={`w3-exercise-option ${selectedAnswer === "A" ? "selected" : ""}`}>
              <input
                type="radio"
                name="hyperlink-quiz"
                value="A"
                checked={selectedAnswer === "A"}
                onChange={() => {
                  setSelectedAnswer("A");
                  setExerciseSubmitted(false);
                }}
              />
              <span className="w3-option-radio-bullet" />
              <code>&lt;a href=&apos;https://devacademy.id&apos;&gt;visit DevAcademy.com!&lt;/a&gt;</code>
            </label>

            <label className={`w3-exercise-option ${selectedAnswer === "B" ? "selected" : ""}`}>
              <input
                type="radio"
                name="hyperlink-quiz"
                value="B"
                checked={selectedAnswer === "B"}
                onChange={() => {
                  setSelectedAnswer("B");
                  setExerciseSubmitted(false);
                }}
              />
              <span className="w3-option-radio-bullet" />
              <code>&lt;link href=&apos;https://devacademy.id&apos;&gt;visit DevAcademy.com!&lt;/link&gt;</code>
            </label>

            <label className={`w3-exercise-option ${selectedAnswer === "C" ? "selected" : ""}`}>
              <input
                type="radio"
                name="hyperlink-quiz"
                value="C"
                checked={selectedAnswer === "C"}
                onChange={() => {
                  setSelectedAnswer("C");
                  setExerciseSubmitted(false);
                }}
              />
              <span className="w3-option-radio-bullet" />
              <code>&lt;alink href=&apos;https://devacademy.id&apos;&gt;visit DevAcademy.com!&lt;/alink&gt;</code>
            </label>
          </div>

          <div className="w3-exercise-actions">
            <button
              type="button"
              onClick={handleExerciseSubmit}
              disabled={!selectedAnswer}
              className="w3-docx-btn-green w3-exercise-submit-btn"
            >
              Submit Answer »
            </button>
          </div>

          {exerciseSubmitted && (
            <div className={`w3-exercise-feedback ${selectedAnswer === "A" ? "success" : "error"}`}>
              {selectedAnswer === "A" ? (
                <>
                  <Check style={{ width: 18, height: 18, color: "#04aa6d" }} />
                  <span>
                    <strong>Correct!</strong> The <code>&lt;a&gt;</code> (anchor) tag with the <code>href</code> attribute is standard HTML syntax for creating hyperlinks.
                  </span>
                </>
              ) : (
                <span>
                  <strong>Not quite right!</strong> The <code>&lt;link&gt;</code> tag is used inside <code>&lt;head&gt;</code> to link external stylesheets, not for hyperlinks in the body. The correct choice is the <code>&lt;a&gt;</code> tag.
                </span>
              )}
            </div>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <Link href="/exercises" className="w3-docx-btn-green">
            See all HTML Exercises
          </Link>
        </div>


      </section>

      <hr className="w3-docx-divider" />

      {/* ------------------------------------------------------------------ */}
      {/* 5. NOTE BOX & HTML REFERENCES (Screenshot 5)                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="w3-docx-section">
        {/* Yellow Note Banner */}
        <div className="w3-docx-yellow-note">
          <strong>Note</strong>
          <p>
            This is an optional feature. You can study at DevAcademy without creating an account.
          </p>
        </div>

        <h2 className="w3-docx-section-title">HTML References</h2>
        <p className="w3-docx-text">
          At DevAcademy you will find complete references about HTML elements, attributes, events, color names, entities, character-sets, URL encoding, language codes, HTTP messages, browser support, and more:
        </p>

        {/* 3-Column 15 Pill Reference Grid */}
        <div className="w3-docx-references-grid">
          {referenceList.map((ref) => (
            <Link
              key={ref.title}
              href={ref.href}
              onClick={(e) => {
                if (onSelectChapter) {
                  e.preventDefault();
                  onSelectChapter(ref.slug);
                }
              }}
              className="w3-docx-ref-pill"
            >
              <span>{ref.title}</span>
            </Link>
          ))}
        </div>
      </section>



      {/* ------------------------------------------------------------------ */}
      {/* 7. BOTTOM NAVIGATION ROW (Screenshot 6 bottom)                     */}
      {/* ------------------------------------------------------------------ */}
      <div className="w3-docx-bottom-nav" style={{ justifyContent: "flex-end" }}>
        {onGoNext ? (
          <button type="button" onClick={onGoNext} className="w3-docx-btn-green">
            Next &gt;
          </button>
        ) : (
          <Link href="/learn/html/introduction" className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>
    </article>
  );
}
