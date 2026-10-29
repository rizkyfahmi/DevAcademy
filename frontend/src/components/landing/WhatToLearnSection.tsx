"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocxCopyButton } from "@/components/docx/DocxCopyButton";

interface SubjectExample {
  id: string;
  label: string;
  icon: string;
  badge: string;
  code: string;
  learnHref: string;
  refHref: string;
}

const SUBJECTS: SubjectExample[] = [
  {
    id: "html",
    label: "HTML",
    icon: "🌐",
    badge: "HTML example",
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>HTML Tutorial</title>
  </head>
  <body>

    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>

  </body>
</html>`,
    learnHref: "/learn/html",
    refHref: "/glossary",
  },
  {
    id: "css",
    label: "CSS",
    icon: "🎨",
    badge: "CSS example",
    code: `body {
  background-color: lightblue;
}

h1 {
  color: white;
  text-align: center;
}

p {
  font-family: verdana;
  font-size: 20px;
}`,
    learnHref: "/learn/css",
    refHref: "/glossary",
  },
  {
    id: "javascript",
    label: "JavaScript",
    icon: "⚡",
    badge: "JavaScript example",
    code: `<button onclick="myFunction()">Click Me!</button>

<script>
function myFunction() {
  let x = document.getElementById("demo");
  x.style.fontSize = "25px";
  x.style.color = "red";
}
</script>`,
    learnHref: "/learn/javascript",
    refHref: "/glossary",
  },
  {
    id: "python",
    label: "Python",
    icon: "🐍",
    badge: "Python example",
    code: `if 5 > 2:
  print("Five is greater than two!")

# Variabel dan perulangan
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
  print("Buah:", fruit)`,
    learnHref: "/learn/python",
    refHref: "/glossary",
  },
  {
    id: "sql",
    label: "SQL",
    icon: "🗄️",
    badge: "SQL example",
    code: `SELECT CustomerName, City, Country 
FROM Customers 
WHERE Country='Indonesia' 
ORDER BY CustomerName ASC;`,
    learnHref: "/learn/sql",
    refHref: "/glossary",
  },
];

export function WhatToLearnSection() {
  const [selected, setSelected] = useState<string>("html");
  const current = SUBJECTS.find((s) => s.id === selected) ?? SUBJECTS[0];

  return (
    <section className="w3-learn-section">
      <motion.div 
        className="w3-learn-container"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Section Header */}
        <div className="w3-section-eyebrow">TUTORIALS</div>
        <h2 className="w3-learn-heading">What do you want to learn?</h2>
        <p className="w3-learn-subtext">
          Pick a language and start right away. Every tutorial is packed with examples 
          you can run and edit in your browser:
        </p>

        {/* Carousel / Pill Selector */}
        <div className="w3-pill-carousel">
          <button 
            type="button" 
            className="w3-carousel-nav-btn"
            aria-label="Previous Topic"
            onClick={() => {
              const idx = SUBJECTS.findIndex((s) => s.id === selected);
              const prev = idx > 0 ? SUBJECTS[idx - 1].id : SUBJECTS[SUBJECTS.length - 1].id;
              setSelected(prev);
            }}
          >
            <ChevronLeft style={{ width: 18, height: 18 }} />
          </button>

          <div className="w3-pill-track">
            {SUBJECTS.map((sub) => {
              const isActive = sub.id === selected;
              return (
                <motion.button
                  key={sub.id}
                  type="button"
                  className={`w3-topic-pill ${isActive ? "active" : ""}`}
                  onClick={() => setSelected(sub.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                >
                  <span className="w3-pill-emoji">{sub.icon}</span>
                  <span className="w3-pill-label">{sub.label}</span>
                </motion.button>
              );
            })}
          </div>

          <button 
            type="button" 
            className="w3-carousel-nav-btn"
            aria-label="Next Topic"
            onClick={() => {
              const idx = SUBJECTS.findIndex((s) => s.id === selected);
              const next = idx < SUBJECTS.length - 1 ? SUBJECTS[idx + 1].id : SUBJECTS[0].id;
              setSelected(next);
            }}
          >
            <ChevronRight style={{ width: 18, height: 18 }} />
          </button>
        </div>

        {/* Interactive Code Window (Screenshot 2) */}
        <motion.div 
          className="w3-example-window"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* macOS Title Bar */}
          <div className="w3-window-bar">
            <div className="w3-window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="w3-window-title">{current.badge}</span>
          </div>

          {/* White Code Canvas */}
          <div className="w3-window-code-wrap">
            <AnimatePresence mode="wait">
              <motion.pre 
                key={current.id}
                className="w3-code-snippet"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <code>{current.code}</code>
              </motion.pre>
            </AnimatePresence>

            {/* Actions: Check Preview & Copy Code */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href={`/tryit?lang=${current.id}&code=${encodeURIComponent(current.code)}&ref=/`} 
                  className="w3-tryit-btn"
                >
                  Check Preview &raquo;
                </Link>
              </motion.div>
              <DocxCopyButton code={current.code} variant="action" label="Salin Kode" />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons Below (Direct to free materi pages) */}
        <div className="w3-learn-actions-row">
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link href={current.learnHref} className="w3-action-ghost-btn">
              Mulai Belajar {current.label}
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Link href="/dashboard" className="w3-action-ghost-btn">
              Semua Materi Tutorial
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
