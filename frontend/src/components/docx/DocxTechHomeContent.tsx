"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Check, 
  Copy, 
} from "lucide-react";
import { useAuthModal } from "@/context/AuthModalContext";
import { getOrCreateCourseMeta, normalizeTechKey, getSlugForTech } from "@/lib/w3-all-courses-catalog";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { DocxCopyButton } from "./DocxCopyButton";

export type TechDocxType = string;

interface DocxTechHomeContentProps {
  tech: TechDocxType;
  onGoNext?: () => void;
  onSelectChapter?: (slug: string) => void;
}

interface TechConfig {
  title: string;
  badgeLabel: string;
  badgeColor: string;
  badgeTextColor?: string;
  learnHeading: string;
  leads: string[];
  exampleIntro: string;
  codeSnippet: string;
  codeSnippetFormatted: React.ReactNode;
  renderPreview: (interactiveText?: string) => React.ReactNode;
  hasInteractiveDemo?: boolean;
  exercise: {
    question: string;
    options: { key: string; label: string; code?: string }[];
    correctKey: string;
    correctExplanation: string;
    wrongExplanation: string;
  };
  references: { title: string; href: string; slug?: string }[];
  certTitle: string;
  certEyebrow: string;
  certDesc: string;
  certSpec: string;
  videoTitle: string;
  videoMinutes: string;
  exercisesHref: string;
}

const TECH_CONFIGS: Record<TechDocxType, TechConfig> = {
  CSS: {
    title: "CSS Tutorial",
    badgeLabel: "CSS3",
    badgeColor: "#0284c7",
    learnHeading: "Learn CSS",
    leads: [
      "CSS is the language we use to style an HTML document.",
      "CSS describes how HTML elements should be displayed.",
      "This tutorial will teach you CSS from basic to advanced!",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit the CSS code and view the result in the browser:",
    codeSnippet: `body {\n  background-color: #f0fdf4;\n}\n\nh1 {\n  color: #04aa6d;\n  text-align: center;\n}\n\np {\n  font-family: verdana;\n  font-size: 16px;\n  color: #334155;\n}`,
    codeSnippetFormatted: (
      <code>
        <span className="code-red">body</span> {"{\n"}
        {"  "}<span className="code-blue">background-color</span>: <span className="code-green">#f0fdf4</span>;{"\n"}
        {"}\n\n"}
        <span className="code-red">h1</span> {"{\n"}
        {"  "}<span className="code-blue">color</span>: <span className="code-green">#04aa6d</span>;{"\n"}
        {"  "}<span className="code-blue">text-align</span>: <span className="code-green">center</span>;{"\n"}
        {"}\n\n"}
        <span className="code-red">p</span> {"{\n"}
        {"  "}<span className="code-blue">font-family</span>: <span className="code-green">verdana</span>;{"\n"}
        {"  "}<span className="code-blue">font-size</span>: <span className="code-green">16px</span>;{"\n"}
        {"  "}<span className="code-blue">color</span>: <span className="code-green">#334155</span>;{"\n"}
        {"}"}
      </code>
    ),
    renderPreview: () => (
      <div style={{ background: "#f0fdf4", padding: "20px", borderRadius: "6px", textAlign: "center" }}>
        <h1 style={{ color: "#04aa6d", fontSize: "22px", margin: "0 0 10px", fontWeight: 700 }}>
          My First CSS Example
        </h1>
        <p style={{ fontFamily: "verdana", fontSize: "15px", color: "#334155", margin: 0 }}>
          This is a styled paragraph demonstrating CSS cascading styles.
        </p>
      </div>
    ),
    exercise: {
      question: "Which CSS property is used to change the background color of an element?",
      options: [
        { key: "A", label: "background-color", code: "background-color" },
        { key: "B", label: "color", code: "color" },
        { key: "C", label: "bgcolor", code: "bgcolor" },
      ],
      correctKey: "A",
      correctExplanation: "The background-color property is used in CSS to define the background color of an HTML element.",
      wrongExplanation: "Incorrect. The color property sets text color, whereas bgcolor is an obsolete HTML attribute, not CSS.",
    },
    references: [
      { title: "CSS Selectors", slug: "selectors", href: "/learn/css/selectors" },
      { title: "CSS Properties", slug: "properties", href: "/learn/css/properties" },
      { title: "CSS Units (px, rem)", slug: "units", href: "/learn/css/units" },
      { title: "CSS Colors & Gradients", slug: "colors", href: "/learn/css/colors" },
      { title: "CSS Browser Support", slug: "browser-support", href: "/learn/css/browser-support" },
      { title: "CSS Flexbox", slug: "flexbox", href: "/learn/css/flexbox" },
      { title: "CSS Grid Layout", slug: "grid", href: "/learn/css/grid" },
      { title: "CSS Box Model", slug: "box-model", href: "/learn/css/box-model" },
      { title: "CSS Transitions", slug: "transitions", href: "/learn/css/transitions" },
      { title: "CSS Animations", slug: "animations", href: "/learn/css/animations" },
      { title: "CSS Media Queries", slug: "media-queries", href: "/learn/css/media-queries" },
      { title: "CSS Web Fonts", slug: "fonts", href: "/learn/css/fonts" },
      { title: "CSS Pseudo-classes", slug: "pseudo-classes", href: "/learn/css/pseudo-classes" },
      { title: "CSS Position", slug: "position", href: "/learn/css/position" },
      { title: "CSS Specificity", slug: "specificity", href: "/learn/css/specificity" },
    ],
    certTitle: "Get Certified in CSS",
    certEyebrow: "CSS CERTIFICATION",
    certDesc: "Master Flexbox, Grid layouts, modern responsive web design, and styling. Earn an official DevAcademy CSS certification for your portfolio.",
    certSpec: "Certified CSS Specialist",
    videoTitle: "Video: CSS Tutorial for Beginners",
    videoMinutes: "45 minutes",
    exercisesHref: "/exercises/css-style-button",
  },
  JAVASCRIPT: {
    title: "JavaScript Tutorial",
    badgeLabel: "JS",
    badgeColor: "#f59e0b",
    badgeTextColor: "#000000",
    learnHeading: "Learn JavaScript",
    leads: [
      "JavaScript is the world's most popular programming language.",
      "JavaScript is the programming language of the Web.",
      "JavaScript is easy to learn and incredibly powerful!",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can edit the JavaScript code and view the dynamic result in the browser:",
    codeSnippet: `<!DOCTYPE html>\n<html>\n<body>\n\n<h2>What Can JavaScript Do?</h2>\n\n<p id="demo">JavaScript can change HTML content.</p>\n\n<button type="button" onclick='document.getElementById("demo").innerHTML = "Hello JavaScript!"'>\n  Click Me!\n</button>\n\n</body>\n</html>`,
    codeSnippetFormatted: (
      <code>
        <span className="code-red">&lt;h2&gt;</span>What Can JavaScript Do?<span className="code-red">&lt;/h2&gt;</span>{"\n\n"}
        <span className="code-red">&lt;p <span className="code-blue">id</span>=<span className="code-green">&quot;demo&quot;</span>&gt;</span>JavaScript can change HTML content.<span className="code-red">&lt;/p&gt;</span>{"\n\n"}
        <span className="code-red">&lt;button <span className="code-blue">onclick</span>=<span className="code-green">&quot;changeText()&quot;</span>&gt;</span>Click Me!<span className="code-red">&lt;/button&gt;</span>
      </code>
    ),
    hasInteractiveDemo: true,
    renderPreview: (interactiveText) => (
      <div style={{ background: "#ffffff", padding: "18px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 10px", color: "#0f172a" }}>
          What Can JavaScript Do?
        </h2>
        <p style={{ fontSize: "15px", color: interactiveText ? "#04aa6d" : "#334155", fontWeight: interactiveText ? 700 : 400, margin: "0 0 14px" }}>
          {interactiveText || "JavaScript can change HTML content."}
        </p>
      </div>
    ),
    exercise: {
      question: "Inside which HTML element do we put the JavaScript code?",
      options: [
        { key: "A", label: "<script>", code: "<script>" },
        { key: "B", label: "<javascript>", code: "<javascript>" },
        { key: "C", label: "<js>", code: "<js>" },
      ],
      correctKey: "A",
      correctExplanation: "Exactly! JavaScript code is inserted between the <script> and </script> tags in an HTML document.",
      wrongExplanation: "Not quite right. The standard HTML tag for JavaScript code is <script>, not <javascript> or <js>.",
    },
    references: [
      { title: "JavaScript Objects", slug: "objects", href: "/learn/javascript/objects" },
      { title: "JavaScript Arrays", slug: "arrays", href: "/learn/javascript/arrays" },
      { title: "JavaScript Strings", slug: "strings", href: "/learn/javascript/strings" },
      { title: "JavaScript Numbers", slug: "numbers", href: "/learn/javascript/numbers" },
      { title: "JavaScript Math", slug: "math", href: "/learn/javascript/math" },
      { title: "JavaScript Dates", slug: "dates", href: "/learn/javascript/dates" },
      { title: "JavaScript DOM Methods", slug: "dom-intro", href: "/learn/javascript/dom-intro" },
      { title: "JavaScript Events", slug: "events", href: "/learn/javascript/events" },
      { title: "JavaScript Window BOM", slug: "bom", href: "/learn/javascript/bom" },
      { title: "JavaScript JSON", slug: "json", href: "/learn/javascript/json" },
      { title: "JavaScript Async/Await", slug: "async", href: "/learn/javascript/async" },
      { title: "JavaScript Fetch API", slug: "fetch", href: "/learn/javascript/fetch" },
      { title: "JavaScript Classes", slug: "classes", href: "/learn/javascript/classes" },
      { title: "JavaScript LocalStorage", slug: "storage", href: "/learn/javascript/storage" },
      { title: "JavaScript RegExp", slug: "regexp", href: "/learn/javascript/regexp" },
    ],
    certTitle: "Get Certified in JavaScript",
    certEyebrow: "JAVASCRIPT CERTIFICATION",
    certDesc: "Learn interactive programming logic, DOM manipulation, asynchronous JavaScript, and ES6+. Earn an official DevAcademy JavaScript certification.",
    certSpec: "Certified JavaScript Developer",
    videoTitle: "Video: JavaScript Tutorial for Beginners",
    videoMinutes: "60 minutes",
    exercisesHref: "/exercises",
  },
  PYTHON: {
    title: "Python Tutorial",
    badgeLabel: "Python",
    badgeColor: "#387eb8",
    learnHeading: "Learn Python",
    leads: [
      "Python is a popular general-purpose programming language.",
      "Python is used in web development, data science, automation, and AI.",
      "Python has a simple and clean syntax similar to the English language.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can execute Python script and view the console output:",
    codeSnippet: `# Python Example\nfruits = ["apple", "banana", "cherry"]\n\nfor x in fruits:\n    print("I like " + x)`,
    codeSnippetFormatted: (
      <code>
        <span className="code-gray"># Python Example</span>{"\n"}
        fruits = [<span className="code-green">&quot;apple&quot;</span>, <span className="code-green">&quot;banana&quot;</span>, <span className="code-green">&quot;cherry&quot;</span>]{"\n\n"}
        <span className="code-blue">for</span> x <span className="code-blue">in</span> fruits:{"\n"}
        {"    "}<span className="code-red">print</span>(<span className="code-green">&quot;I like &quot;</span> + x)
      </code>
    ),
    renderPreview: () => (
      <div style={{ background: "#0f172a", color: "#38bdf8", padding: "16px", borderRadius: "6px", fontFamily: "monospace", fontSize: "14px" }}>
        <div style={{ color: "#94a3b8", marginBottom: "8px" }}>$ python main.py</div>
        <div style={{ color: "#4ade80" }}>I like apple</div>
        <div style={{ color: "#4ade80" }}>I like banana</div>
        <div style={{ color: "#4ade80" }}>I like cherry</div>
      </div>
    ),
    exercise: {
      question: "What is a correct syntax to output 'Hello World' in Python?",
      options: [
        { key: "A", label: "print('Hello World')", code: "print('Hello World')" },
        { key: "B", label: "echo 'Hello World'", code: "echo 'Hello World'" },
        { key: "C", label: "console.log('Hello World')", code: "console.log('Hello World')" },
      ],
      correctKey: "A",
      correctExplanation: "Correct! The built-in print() function is used to output text or variables to the console in Python.",
      wrongExplanation: "Not quite right. In Python we use the print() function, unlike echo (PHP/Bash) or console.log (JavaScript).",
    },
    references: [
      { title: "Python Built-in Functions", slug: "functions", href: "/learn/python/functions" },
      { title: "Python String Methods", slug: "strings", href: "/learn/python/strings" },
      { title: "Python List Methods", slug: "lists", href: "/learn/python/lists" },
      { title: "Python Dictionary Methods", slug: "dictionaries", href: "/learn/python/dictionaries" },
      { title: "Python Tuple Methods", slug: "tuples", href: "/learn/python/tuples" },
      { title: "Python Set Methods", slug: "sets", href: "/learn/python/sets" },
      { title: "Python File Methods", slug: "file-handling", href: "/learn/python/file-handling" },
      { title: "Python Keywords", slug: "keywords", href: "/learn/python/keywords" },
      { title: "Python Built-in Exceptions", slug: "try-except", href: "/learn/python/try-except" },
      { title: "Python Math Module", slug: "math", href: "/learn/python/math" },
      { title: "Python Random Module", slug: "random", href: "/learn/python/random" },
      { title: "Python Requests Module", slug: "pip", href: "/learn/python/pip" },
      { title: "Python JSON Module", slug: "json", href: "/learn/python/json" },
      { title: "Python PIP Package Manager", slug: "pip", href: "/learn/python/pip" },
      { title: "Python RegEx", slug: "regex", href: "/learn/python/regex" },
    ],
    certTitle: "Get Certified in Python",
    certEyebrow: "PYTHON CERTIFICATION",
    certDesc: "Demonstrate your Python skills from fundamentals, data manipulation, to object-oriented programming (OOP) with an official DevAcademy certification.",
    certSpec: "Certified Python Programmer",
    videoTitle: "Video: Python Tutorial for Beginners",
    videoMinutes: "55 minutes",
    exercisesHref: "/exercises",
  },
  SQL: {
    title: "SQL Tutorial",
    badgeLabel: "SQL",
    badgeColor: "#0284c7",
    learnHeading: "Learn SQL",
    leads: [
      "SQL is a standard language for storing, manipulating and retrieving data in databases.",
      "SQL is an essential skill for developers, data scientists, and analysts.",
      "Our SQL tutorial will teach you how to use SQL with MySQL, PostgreSQL, and SQLite.",
    ],
    exampleIntro: "With our 'Try it Yourself' editor, you can run SQL queries and view database table results:",
    codeSnippet: `-- SQL Example\nSELECT CustomerName, City, Country\nFROM Customers\nWHERE Country = 'Indonesia';`,
    codeSnippetFormatted: (
      <code>
        <span className="code-gray">-- SQL Example</span>{"\n"}
        <span className="code-blue">SELECT</span> CustomerName, City, Country{"\n"}
        <span className="code-blue">FROM</span> Customers{"\n"}
        <span className="code-blue">WHERE</span> Country = <span className="code-green">&apos;Indonesia&apos;</span>;
      </code>
    ),
    renderPreview: () => (
      <div style={{ background: "#ffffff", padding: "14px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "8px", border: "1px solid #cbd5e1" }}>CustomerName</th>
              <th style={{ padding: "8px", border: "1px solid #cbd5e1" }}>City</th>
              <th style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Budi Santoso</td>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Jakarta</td>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Indonesia</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Siti Rahma</td>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Surabaya</td>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Indonesia</td>
            </tr>
            <tr>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Dewa Pratama</td>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Bali</td>
              <td style={{ padding: "8px", border: "1px solid #cbd5e1" }}>Indonesia</td>
            </tr>
          </tbody>
        </table>
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#64748b" }}>
          Showing 3 rows filtered by Country = &apos;Indonesia&apos;
        </div>
      </div>
    ),
    exercise: {
      question: "Which SQL statement is used to extract data from a database?",
      options: [
        { key: "A", label: "SELECT", code: "SELECT" },
        { key: "B", label: "EXTRACT", code: "EXTRACT" },
        { key: "C", label: "GET", code: "GET" },
      ],
      correctKey: "A",
      correctExplanation: "Exactly! The SELECT statement is the fundamental SQL query command used to retrieve and display data from a database table.",
      wrongExplanation: "Incorrect. Standard SQL uses the SELECT keyword to read data from a database.",
    },
    references: [
      { title: "SQL SELECT", slug: "select", href: "/learn/sql/select" },
      { title: "SQL WHERE", slug: "where", href: "/learn/sql/where" },
      { title: "SQL ORDER BY", slug: "order-by", href: "/learn/sql/order-by" },
      { title: "SQL AND / OR", slug: "and-or-not", href: "/learn/sql/and-or-not" },
      { title: "SQL INSERT INTO", slug: "insert-into", href: "/learn/sql/insert-into" },
      { title: "SQL NULL Values", slug: "null-values", href: "/learn/sql/null-values" },
      { title: "SQL UPDATE", slug: "update", href: "/learn/sql/update" },
      { title: "SQL DELETE", slug: "delete", href: "/learn/sql/delete" },
      { title: "SQL TOP / LIMIT", slug: "select-top", href: "/learn/sql/select-top" },
      { title: "SQL MIN / MAX", slug: "min-max", href: "/learn/sql/min-max" },
      { title: "SQL COUNT / AVG", slug: "count-avg-sum", href: "/learn/sql/count-avg-sum" },
      { title: "SQL LIKE Operator", slug: "like", href: "/learn/sql/like" },
      { title: "SQL IN Operator", slug: "in", href: "/learn/sql/in" },
      { title: "SQL BETWEEN", slug: "between", href: "/learn/sql/between" },
      { title: "SQL Joins (INNER, LEFT)", slug: "joins", href: "/learn/sql/joins" },
    ],
    certTitle: "Get Certified in SQL",
    certEyebrow: "SQL CERTIFICATION",
    certDesc: "Master relational database design, complex queries, aggregations, and performance optimization with an official DevAcademy certification.",
    certSpec: "Certified SQL Database Specialist",
    videoTitle: "Video: SQL Tutorial for Beginners",
    videoMinutes: "40 minutes",
    exercisesHref: "/exercises",
  },
};

export function DocxTechHomeContent({ tech, onGoNext, onSelectChapter }: DocxTechHomeContentProps) {
  const { openSignIn } = useAuthModal();
  const normalized = normalizeTechKey(tech);
  const config = (TECH_CONFIGS as Record<string, TechConfig>)[normalized] || (() => {
    const meta = getOrCreateCourseMeta(normalized);
    return {
      title: meta.title,
      badgeLabel: meta.badgeLabel,
      badgeColor: meta.badgeColor,
      badgeTextColor: meta.badgeTextColor,
      learnHeading: meta.learnHeading,
      leads: meta.leads,
      exampleIntro: meta.exampleIntro,
      codeSnippet: meta.codeSnippet,
      codeSnippetFormatted: (
        <code style={{ whiteSpace: "pre", fontFamily: "Consolas, Menlo, Monaco, monospace" }}>
          {meta.codeSnippet}
        </code>
      ),
      renderPreview: () => (
        <div style={{ background: "#0f172a", color: "#4ade80", padding: "18px", borderRadius: "6px", fontFamily: "monospace", fontSize: "14px", whiteSpace: "pre-wrap", border: "1px solid #334155" }}>
          {meta.previewOutput}
        </div>
      ),
      hasInteractiveDemo: false,
      exercise: meta.exercise,
      references: meta.references,
      certTitle: meta.certTitle,
      certEyebrow: meta.certEyebrow,
      certDesc: meta.certDesc,
      certSpec: meta.certSpec,
      videoTitle: meta.videoTitle,
      videoMinutes: meta.videoMinutes,
      exercisesHref: `/learn/${meta.slug}/exercises`,
    };
  })();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [interactiveJsText, setInteractiveJsText] = useState("");

  const handleExerciseSubmit = () => {
    if (!selectedAnswer) return;
    setExerciseSubmitted(true);
  };

  return (
    <article className="w3-docx-main-content">
      {/* 1. TOP NAV ROW & TITLE */}
      <div className="w3-docx-top-actions" style={{ justifyContent: "flex-end" }}>
        {onGoNext ? (
          <button type="button" onClick={onGoNext} className="w3-docx-btn-green">
            Next &gt;
          </button>
        ) : (
          <Link href={`/learn/${tech.toLowerCase()}/introduction`} className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>

      <div className="w3-docx-header-title-row">
        <h1 className="w3-docx-page-title">{config.title}</h1>
        <DocxBookmarkButton
          tech={tech}
          chapterSlug="home"
          title={config.title}
          url={`/learn/${getSlugForTech(tech)}`}
        />
      </div>

      {/* 2. HERO BANNER */}
      <div className="w3-docx-hero-banner">
        <div className="w3-docx-hero-left">
          <div className="w3-docx-html-badge">
            <span
              className="w3-html5-shield"
              style={{
                background: config.badgeColor,
                color: config.badgeTextColor || "#ffffff",
              }}
            >
              {config.badgeLabel}
            </span>
            <h2 className="w3-docx-learn-heading">{config.learnHeading}</h2>
          </div>

          {config.leads.map((lead, idx) => (
            <p key={idx} className="w3-docx-lead-text">
              {lead}
            </p>
          ))}

          {onGoNext ? (
            <button
              type="button"
              onClick={onGoNext}
              className="w3-docx-btn-green w3-docx-cta-now"
            >
              <span>{config.learnHeading} now &gt;</span>
            </button>
          ) : (
            <Link
              href={`/learn/${tech.toLowerCase()}/introduction`}
              className="w3-docx-btn-green w3-docx-cta-now"
            >
              <span>{config.learnHeading} now &gt;</span>
            </Link>
          )}
        </div>
      </div>

      <hr className="w3-docx-divider" />

      {/* 3. LEARNING BY EXAMPLES */}
      <section className="w3-docx-section">
        <div className="w3-docx-section-header-row">
          <h2 className="w3-docx-section-title">Learning by Examples</h2>
        </div>

        <p className="w3-docx-text">{config.exampleIntro}</p>

        {/* Example Box */}
        <div className="w3-docx-example-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 className="w3-docx-example-title" style={{ margin: 0 }}>Example</h3>
            <DocxCopyButton code={config.codeSnippet} variant="action" label="Salin Kode" />
          </div>

          <div className="w3-docx-code-window">
            <pre className="w3-code-snippet">{config.codeSnippetFormatted}</pre>
          </div>

          <div className="w3-example-actions">
            <Link
              href={`/tryit?lang=${getSlugForTech(tech)}&code=${encodeURIComponent(config.codeSnippet)}&ref=${encodeURIComponent(`/learn/${getSlugForTech(tech)}`)}`}
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

        {/* Examples Subsection */}
        <div className="w3-docx-sub-block">
          <h3 className="w3-docx-sub-heading">{tech} Examples</h3>
          <p className="w3-docx-text">
            This tutorial supplements all explanations with clarifying examples.
          </p>
          <Link href="/playground" className="w3-docx-btn-gray">
            See all {tech} Examples
          </Link>
        </div>
      </section>

      <hr className="w3-docx-divider" />

      {/* 4. EXERCISES & QUIZ TEST */}
      <section className="w3-docx-section">
        <h2 className="w3-docx-section-title">{tech} Exercises</h2>
        <p className="w3-docx-text">
          Many chapters in this tutorial end with an exercise where you can check your level of knowledge.
        </p>

        {/* Interactive Dark Exercise Card */}
        <div className="w3-docx-exercise-dark-card">
          <div className="w3-exercise-badge">
            <span>Exercise</span>
            <span className="w3-exercise-qmark" title="Select the best answer">?</span>
          </div>

          <h3 className="w3-exercise-question">{config.exercise.question}</h3>

          <div className="w3-exercise-options-list">
            {config.exercise.options.map((opt) => {
              const isSelected = selectedAnswer === opt.key;
              return (
                <label
                  key={opt.key}
                  className={`w3-exercise-option ${isSelected ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={`${tech.toLowerCase()}-home-quiz`}
                    value={opt.key}
                    checked={isSelected}
                    onChange={() => {
                      setSelectedAnswer(opt.key);
                      setExerciseSubmitted(false);
                    }}
                  />
                  <span className="w3-option-radio-bullet" />
                  {opt.code ? <code>{opt.code}</code> : <span>{opt.label}</span>}
                </label>
              );
            })}
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
            <div
              className={`w3-exercise-feedback ${
                selectedAnswer === config.exercise.correctKey ? "success" : "error"
              }`}
            >
              {selectedAnswer === config.exercise.correctKey ? (
                <>
                  <Check style={{ width: 18, height: 18, color: "#04aa6d" }} />
                  <span>
                    <strong>Correct!</strong> {config.exercise.correctExplanation}
                  </span>
                </>
              ) : (
                <span>
                  <strong>Not quite right!</strong> {config.exercise.wrongExplanation}
                </span>
              )}
            </div>
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <Link href={config.exercisesHref} className="w3-docx-btn-green">
            See all {tech} Exercises
          </Link>
        </div>


      </section>

      <hr className="w3-docx-divider" />

      {/* 5. NOTE BOX & REFERENCES */}
      <section className="w3-docx-section">
        {/* Yellow Note Banner */}
        <div className="w3-docx-yellow-note">
          <strong>Note</strong>
          <p>
            This is an optional feature. You can study at DevAcademy without creating an account.
          </p>
        </div>

        <h2 className="w3-docx-section-title">{tech} References</h2>
        <p className="w3-docx-text">
          At DevAcademy you will find complete references about {tech} syntax, methods, properties, and standard library:
        </p>

        {/* 3-Column Pill Reference Grid */}
        <div className="w3-docx-references-grid">
          {config.references.map((ref) => {
            const courseSlug = getSlugForTech(tech);
            const slug = (ref as any).slug || (ref.href ? ref.href.split("/").pop() : "home") || "home";
            const href = ref.href && !ref.href.startsWith("/glossary") && !ref.href.startsWith("/help") && !ref.href.startsWith("/playground")
              ? ref.href
              : `/learn/${courseSlug}/${slug}`;

            return (
              <Link
                key={ref.title}
                href={href}
                onClick={(e) => {
                  if (onSelectChapter) {
                    e.preventDefault();
                    onSelectChapter(slug);
                  }
                }}
                className="w3-docx-ref-pill"
              >
                <span>{ref.title}</span>
              </Link>
            );
          })}
        </div>
      </section>


      {/* 7. BOTTOM NAVIGATION ROW */}
      <div className="w3-docx-bottom-nav" style={{ justifyContent: "flex-end" }}>
        {onGoNext ? (
          <button type="button" onClick={onGoNext} className="w3-docx-btn-green">
            Next &gt;
          </button>
        ) : (
          <Link href={`/learn/${getSlugForTech(tech)}/introduction`} className="w3-docx-btn-green">
            Next &gt;
          </Link>
        )}
      </div>
    </article>
  );
}
