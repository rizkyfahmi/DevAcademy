"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Play, RotateCcw, Sparkles } from "lucide-react";

interface SandboxTopic {
  id: string;
  label: string;
  filename: string;
  language: string;
  description: string;
  code: string;
}

const TOPICS: SandboxTopic[] = [
  {
    id: "html",
    label: "HTML",
    filename: "index.html",
    language: "html",
    description: "Markup language to structure web pages, forms, and digital content.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: system-ui, sans-serif; text-align: center; padding: 24px; margin: 0; background: #ffffff; }
    h1 { color: #19232e; font-size: 22px; margin-bottom: 8px; }
    p { color: #687481; font-size: 13.5px; margin-bottom: 16px; }
    .badge { display: inline-block; background: #fff8d8; color: #665311; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; }
    .btn { background: #04aa6d; color: #ffffff; border: none; padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; }
    .btn:hover { background: #059862; }
  </style>
</head>
<body>
  <span class="badge">Live HTML Practice</span>
  <h1>Hello from DevAcademy!</h1>
  <p>Edit this code in the left pane, then click the <b>Run</b> button to see instant changes.</p>
  <button class="btn" onclick="alert('Congratulations! You ran your first live code!')">Click Me</button>
</body>
</html>`,
  },
  {
    id: "css",
    label: "CSS",
    filename: "style.css",
    language: "html",
    description: "Styling language for visual layouts, colors, and typography.",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: #f3f5f7;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 200px;
      margin: 0;
      font-family: system-ui, sans-serif;
    }
    .card {
      background: #ffffff;
      padding: 24px 28px;
      border-radius: 14px;
      border: 1px solid #e3e7eb;
      box-shadow: 0 10px 24px rgba(24, 35, 46, 0.06);
      text-align: center;
      max-width: 280px;
    }
    .avatar {
      width: 48px;
      height: 48px;
      background: #04aa6d;
      color: #ffffff;
      border-radius: 50%;
      margin: 0 auto 12px;
      display: grid;
      place-items: center;
      font-size: 20px;
    }
    h2 { font-size: 16px; margin: 0 0 6px; color: #19232e; }
    p { font-size: 12.5px; color: #687481; margin: 0; line-height: 1.45; }
  </style>
</head>
<body>
  <div class="card">
    <div class="avatar">⚡</div>
    <h2>Modern CSS Card</h2>
    <p>Try changing <code>#04aa6d</code> to your favorite accent color!</p>
  </div>
</body>
</html>`,
  },
  {
    id: "javascript",
    label: "JavaScript",
    filename: "script.js",
    language: "html",
    description: "Dynamic programming language powering interactivity and frontend logic.",
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; text-align: center; padding: 22px; margin: 0; background: #fff; }
    .counter-val { font-size: 44px; font-weight: 800; color: #19232e; margin: 8px 0; }
    .btn-row { display: flex; justify-content: center; gap: 8px; }
    button { background: #19232e; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; }
    button:hover { background: #04aa6d; color: #ffffff; }
    .status { font-size: 12px; color: #687481; margin-top: 10px; }
  </style>
</head>
<body>
  <div style="font-size: 12px; color: #87919a; text-transform: uppercase; font-weight: bold;">Interactive Counter</div>
  <div id="counter" class="counter-val">0</div>
  <div class="btn-row">
    <button onclick="decrement()">- Decrement</button>
    <button onclick="reset()">Reset</button>
    <button onclick="increment()">+ Increment</button>
  </div>
  <div id="status" class="status">Click any button to trigger the JavaScript function.</div>

  <script>
    let count = 0;
    const counterEl = document.getElementById('counter');
    const statusEl = document.getElementById('status');

    function increment() {
      count++;
      update();
    }
    function decrement() {
      count--;
      update();
    }
    function reset() {
      count = 0;
      update();
    }
    function update() {
      counterEl.textContent = count;
      statusEl.textContent = 'Current value: ' + count;
    }
  </script>
</body>
</html>`,
  },
  {
    id: "python",
    label: "Python",
    filename: "main.py",
    language: "python",
    description: "Versatile language with clean, intuitive syntax for backend & AI.",
    code: `# Calculate even numbers in Python
def find_evens(limit):
    hasil = [n for n in range(1, limit + 1) if n % 2 == 0]
    return hasil

angka_batas = 10
genap = find_evens(angka_batas)

print("=== Python Execution Output ===")
print(f"Even numbers 1 to {angka_batas}:")
for i, val in enumerate(genap, 1):
    print(f"  {i}. Value: {val}")
print(f"Total found: {len(genap)} numbers.")`,
  },
];

export function InteractiveSandbox() {
  const [activeTab, setActiveTab] = useState<string>("html");
  const currentTopic = TOPICS.find((t) => t.id === activeTab) ?? TOPICS[0];

  const [codes, setCodes] = useState<Record<string, string>>({
    html: TOPICS[0].code,
    css: TOPICS[1].code,
    javascript: TOPICS[2].code,
    python: TOPICS[3].code,
  });

  const [renderedCodes, setRenderedCodes] = useState<Record<string, string>>({
    html: TOPICS[0].code,
    css: TOPICS[1].code,
    javascript: TOPICS[2].code,
    python: TOPICS[3].code,
  });

  const [copied, setCopied] = useState(false);

  const handleCodeChange = (newVal: string) => {
    setCodes((prev) => ({ ...prev, [activeTab]: newVal }));
  };

  const handleRun = () => {
    setRenderedCodes((prev) => ({ ...prev, [activeTab]: codes[activeTab] }));
  };

  const handleReset = () => {
    const original = TOPICS.find((t) => t.id === activeTab)?.code || "";
    setCodes((prev) => ({ ...prev, [activeTab]: original }));
    setRenderedCodes((prev) => ({ ...prev, [activeTab]: original }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codes[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const currentDraft = codes[activeTab];
  const currentRendered = renderedCodes[activeTab];

  // For Python tab preview simulation:
  const getPythonPreview = (code: string) => {
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 16px;
      background: #17212c;
      color: #eaf0f5;
      font-family: "Cascadia Code", Consolas, monospace;
      font-size: 12.5px;
      line-height: 1.65;
    }
    .badge { color: #f0c928; font-weight: bold; margin-bottom: 8px; display: block; }
    .out { color: #a9f0d1; white-space: pre-wrap; margin-top: 10px; }
  </style>
</head>
<body>
  <span class="badge">Terminal Output (Python Simulation):</span>
  <div class="out">=== Python Execution Output ===
Even numbers from 1 to 10:
  1. Value: 2
  2. Value: 4
  3. Value: 6
  4. Value: 8
  5. Value: 10
Total found: 5 numbers.</div>
</body>
</html>`;
  };

  const previewSrcDoc = currentTopic.id === "python" 
    ? getPythonPreview(currentRendered) 
    : currentRendered;

  const playgroundUrl = `/playground?code=${encodeURIComponent(currentDraft)}&language=${encodeURIComponent(currentTopic.language)}`;

  return (
    <section className="landing-sandbox-section" id="try-it-yourself">
      <div className="landing-section-header">
        <span className="pill pill-yellow">
          <Sparkles className="pill-icon" />
          Try it Yourself in Browser
        </span>
        <h2>Test Live Code Interactively</h2>
        <p>
          Just like on W3Schools, you can edit the code snippets below 
          and see the live results instantly without installing anything.
        </p>
      </div>

      <div className="landing-sandbox-container">
        {/* Tab Switcher */}
        <div className="sandbox-tabs" role="tablist">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              role="tab"
              aria-selected={activeTab === topic.id}
              className={`sandbox-tab-btn ${activeTab === topic.id ? "active" : ""}`}
              onClick={() => setActiveTab(topic.id)}
            >
              <span className="tab-pill-indicator" />
              {topic.label}
            </button>
          ))}
        </div>

        {/* Sandbox Content Grid */}
        <div className="sandbox-card">
          <div className="sandbox-bar">
            <div className="sandbox-bar-file">
              <span className="editor-dot red" />
              <span className="editor-dot yellow" />
              <span className="editor-dot green" />
              <strong className="sandbox-filename">{currentTopic.filename}</strong>
              <span className="sandbox-lang-tag">{currentTopic.language.toUpperCase()}</span>
            </div>
            <div className="sandbox-bar-actions">
              <button
                type="button"
                className="sandbox-action-btn"
                title={copied ? "Copied!" : "Copy Code"}
                onClick={handleCopy}
              >
                {copied ? <Check className="btn-icon text-good" /> : <Copy className="btn-icon" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button
                type="button"
                className="sandbox-action-btn"
                title="Reset to default example"
                onClick={handleReset}
              >
                <RotateCcw className="btn-icon" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                className="sandbox-run-btn"
                onClick={handleRun}
              >
                <Play className="btn-icon" />
                <span>Run</span>
              </button>
            </div>
          </div>

          <div className="sandbox-split">
            {/* Editor Input */}
            <div className="sandbox-pane sandbox-editor-pane">
              <label htmlFor="sandbox-textarea" className="sr-only">
                Interactive code editor
              </label>
              <textarea
                id="sandbox-textarea"
                className="sandbox-textarea"
                spellCheck={false}
                value={currentDraft}
                onChange={(e) => handleCodeChange(e.target.value)}
              />
            </div>

            {/* Preview Frame */}
            <div className="sandbox-pane sandbox-preview-pane">
              <div className="sandbox-preview-bar">
                <span className="preview-label">
                  {currentTopic.id === "python" ? "Terminal Output" : "Browser Preview"}
                </span>
                <span className="preview-live-dot" title="Live Preview" />
              </div>
              <iframe
                title={`Preview ${currentTopic.label}`}
                sandbox="allow-scripts"
                className="sandbox-iframe"
                srcDoc={previewSrcDoc}
              />
            </div>
          </div>

          {/* Sandbox Footer CTA */}
          <div className="sandbox-footer">
            <span className="sandbox-footer-note">
              💡 {currentTopic.description}
            </span>
            <div className="button-row">
              <Link href={playgroundUrl} className="secondary-button sandbox-link-btn">
                <span>Open in Full Playground</span>
                <ExternalLink className="btn-icon-sm" />
              </Link>
              <Link href={`/learn/${currentTopic.id}`} className="primary-button sandbox-link-btn">
                <span>Learn {currentTopic.label} Tutorial</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
