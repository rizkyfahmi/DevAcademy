"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, Sparkles, CheckCircle2, Code2, BookOpen, ArrowRight, RotateCcw, ChevronRight } from "lucide-react";
import { ALL_HTML_CHAPTERS } from "@/lib/w3-html-chapters-data";
import { ALL_CSS_CHAPTERS } from "@/lib/w3-css-chapters-data";
import { ALL_JS_CHAPTERS } from "@/lib/w3-js-chapters-data";
import { ALL_PYTHON_CHAPTERS } from "@/lib/w3-python-chapters-data";
import { ALL_SQL_CHAPTERS } from "@/lib/w3-sql-chapters-data";


export interface TutorialItem {
  id: string;
  name: string;
  subtitle: string;
  href: string;
  category: "web" | "backend" | "data" | "mobile" | "database" | "other";
  icon: React.ReactNode;
}

export const ALL_W3_TUTORIALS: TutorialItem[] = [
  // --- CORE WEB ---
  {
    id: "html",
    name: "HTML",
    subtitle: "The building blocks of every webpage",
    href: "/learn/html",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#E44D26" />
        <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#F16529" />
        <path d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "css",
    name: "CSS",
    subtitle: "Style and layout for web pages",
    href: "/learn/css",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#1572B6" />
        <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#33A9DC" />
        <path d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "javascript",
    name: "JavaScript",
    subtitle: "Interactive and dynamic web pages",
    href: "/learn/javascript",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36">
        <rect width="32" height="32" rx="5" fill="#F7DF1E" />
        <path d="M18.8 25.2c.7 1.2 1.8 2 3.5 2 2 0 3.2-1 3.2-2.5 0-1.8-1.5-2.4-3.8-3.4-3.3-1.4-5.5-3.1-5.5-6.8 0-3.4 2.6-6 6.6-6 2.9 0 4.9 1.1 6.2 3.4l-3.2 2.1c-.7-1.3-1.6-1.8-3-1.8-1.4 0-2.3.9-2.3 2 0 1.4 1 2 3.3 3 3.8 1.6 6.1 3.2 6.1 7.2 0 4.1-3.2 6.6-7.5 6.6-4.1 0-6.7-2-7.8-4.6l4.2-2.2zM7.2 22.8c.4.8.9 1.4 1.8 1.9 1.2.6 2.3.5 3.1-.2 1.1-1 1-2.9 1-5.7V8.5h4.4v10.5c0 3.6-.3 5.9-2.2 7.5-1.9 1.6-4.7 1.7-7.2.7-2-.8-3.2-2.5-3.7-4.4h2.8z" fill="#000" />
      </svg>
    ),
  },
  {
    id: "sql",
    name: "SQL",
    subtitle: "Query and manage databases",
    href: "/learn/sql",
    category: "database",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <ellipse cx="16" cy="7" rx="10" ry="4" fill="#0284C7" />
        <path d="M6 7v8c0 2.2 4.5 4 10 4s10-1.8 10-4V7" stroke="#0284C7" strokeWidth="2.5" fill="#E0F2FE" />
        <path d="M6 15v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" stroke="#0284C7" strokeWidth="2.5" fill="#E0F2FE" />
      </svg>
    ),
  },
  {
    id: "python",
    name: "Python",
    subtitle: "Popular programming language for web, data & AI",
    href: "/learn/python",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <path d="M15.8 3c-6.8 0-6.4 2.9-6.4 2.9l.01 3h6.5v.9H5.7S2 9.4 2 16.2c0 6.9 3.3 6.6 3.3 6.6h2V19.9s-.1-3.4 3.4-3.4h5.8s3.3.1 3.3-3.2V6.2S18.3 3 15.8 3zm-3.6 1.8a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" fill="#387EB8" />
        <path d="M16.2 29c6.8 0 6.4-2.9 6.4-2.9l-.01-3h-6.5v-.9h10.2s3.7.4 3.7-6.4c0-6.9-3.3-6.6-3.3-6.6h-2v2.9s.1 3.4-3.4 3.4H15.5s-3.3-.1-3.3 3.2v7.1s-.5 3.2 4 3.2zm3.6-1.8a1.1 1.1 0 110-2.2 1.1 1.1 0 010 2.2z" fill="#FFE052" />
      </svg>
    ),
  },
  {
    id: "java",
    name: "Java",
    subtitle: "Object-oriented programming language",
    href: "/learn/java",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#F8FAFC" />
        <path d="M13 22c5-1 8 0 9-1.5s0-2.5-3-2.5c-3.5 0-5 2-6 4z" stroke="#EA2D2E" strokeWidth="2" strokeLinecap="round" />
        <path d="M11 26c7-1 11 0 13-2s-1-3-5-3c-4.5 0-7 2.5-8 5z" stroke="#5382A1" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 7c2 2-1 4-1 6s3 2 1 5" stroke="#EA2D2E" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 8c2 2-1 4-1 6s2 2 1 4" stroke="#5382A1" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "c",
    name: "C",
    subtitle: "Powerful low-level programming",
    href: "/learn/c",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#F1F5F9" />
        <path d="M22 10.5a8 8 0 00-12 0 8.5 8.5 0 000 11 8 8 0 0012 0" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "cpp",
    name: "C++",
    subtitle: "Powerful high-performance programming",
    href: "/learn/cpp",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#00599C" />
        <path d="M15 11a6 6 0 00-9 0 6.5 6.5 0 000 10 6 6 0 009 0" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <path d="M19 16h4m-2-2v4m5-2h4m-2-2v4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "csharp",
    name: "C#",
    subtitle: "Modern multi-paradigm programming",
    href: "/learn/csharp",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#68217A" />
        <path d="M15 11a6 6 0 00-9 0 6.5 6.5 0 000 10 6 6 0 009 0" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <text x="17" y="21" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="monospace">#</text>
      </svg>
    ),
  },
  {
    id: "bootstrap4",
    name: "Bootstrap 4",
    subtitle: "Responsive CSS framework",
    href: "/learn/bootstrap",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#563D7C" />
        <text x="16" y="23" fill="#fff" fontSize="18" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">B4</text>
      </svg>
    ),
  },
  {
    id: "bootstrap5",
    name: "Bootstrap 5",
    subtitle: "Responsive CSS framework",
    href: "/learn/bootstrap",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#7952B3" />
        <text x="16" y="23" fill="#fff" fontSize="18" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">B5</text>
      </svg>
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    subtitle: "Server-side JavaScript runtime",
    href: "/learn/nodejs",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#333333" />
        <path d="M16 6l9 5v10l-9 5-9-5V11l9-5z" stroke="#68A063" strokeWidth="2" fill="#215732" />
        <text x="16" y="19" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">node</text>
      </svg>
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    subtitle: "Typed superset of JavaScript",
    href: "/learn/typescript",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#3178C6" />
        <text x="16" y="22" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">TS</text>
      </svg>
    ),
  },
  {
    id: "django",
    name: "Django",
    subtitle: "Python web framework",
    href: "/learn/django",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#092E20" />
        <text x="16" y="21" fill="#fff" fontSize="12" fontWeight="bold" fontFamily="serif" textAnchor="middle">dj</text>
      </svg>
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    subtitle: "Advanced relational database",
    href: "/learn/postgresql",
    category: "database",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#336791" />
        <path d="M16 8c-4 0-6 3-6 7 0 5 3 9 6 9s6-4 6-9c0-4-2-7-6-7z" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    id: "jquery",
    name: "jQuery",
    subtitle: "Fast and concise JavaScript library",
    href: "/learn/jquery",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#0769AD" />
        <path d="M9 16c2-4 7-6 11-3s4 9 1 12" stroke="#7ECEF4" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "xml",
    name: "XML",
    subtitle: "Markup language for data",
    href: "/learn/xml",
    category: "data",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#F1F5F9" />
        <path d="M9 11l-4 5 4 5m14-10l4 5-4 5m-7-12l-2 14" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "numpy",
    name: "NumPy",
    subtitle: "Scientific computing with Python",
    href: "/learn/numpy",
    category: "data",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#013243" />
        <text x="16" y="21" fill="#4DABCF" fontSize="13" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">NP</text>
      </svg>
    ),
  },
  {
    id: "pandas",
    name: "Pandas",
    subtitle: "Data analysis with Python",
    href: "/learn/pandas",
    category: "data",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#150458" />
        <path d="M12 9v14m4-11v11m4-14v14" stroke="#FFD43B" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "howto",
    name: "How To",
    subtitle: "Code snippets and examples",
    href: "/learn/howto",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#1E293B" />
        <circle cx="16" cy="16" r="9" stroke="#94A3B8" strokeWidth="2" />
        <text x="16" y="21" fill="#38BDF8" fontSize="14" fontWeight="bold" textAnchor="middle">?</text>
      </svg>
    ),
  },
  {
    id: "angular",
    name: "Angular",
    subtitle: "Front-end web framework",
    href: "/learn/angular",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <path d="M16 3l11 4-2 15-9 6-9-6-2-15 11-4z" fill="#DD0031" />
        <path d="M16 3v25l9-6 2-15-11-4z" fill="#C3002F" />
        <path d="M16 7l-6 13h3l1.2-3h5.6l1.2 3h3L16 7zm-1.8 8l1.8-4.5 1.8 4.5h-3.6z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "swift",
    name: "Swift",
    subtitle: "Programming language for Apple",
    href: "/learn/swift",
    category: "mobile",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#FA7343" />
        <path d="M25 8c-4 5-10 8-15 10 5 1 10 0 14-2-4 3-9 5-14 5 7 3 15 1 19-3-2-2-4-6-4-10z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "sass",
    name: "Sass",
    subtitle: "CSS preprocessor language",
    href: "/learn/sass",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#CF649A" />
        <text x="16" y="21" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Sass</text>
      </svg>
    ),
  },
  {
    id: "vue",
    name: "Vue",
    subtitle: "Progressive JavaScript framework",
    href: "/learn/vue",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <path d="M2 5l14 24L30 5h-5.5L16 19.5 7.5 5H2z" fill="#41B883" />
        <path d="M7.5 5L16 19.5 24.5 5h-4.5L16 12 12 5H7.5z" fill="#35495E" />
      </svg>
    ),
  },
  {
    id: "genai",
    name: "Gen AI",
    subtitle: "AI that creates content",
    href: "/learn/gen-ai",
    category: "other",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#F8FAFC" />
        <path d="M16 4l2.5 8.5L27 15l-8.5 2.5L16 26l-2.5-8.5L5 15l8.5-2.5L16 4z" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round" fill="#EDE9FE" />
      </svg>
    ),
  },
  {
    id: "scipy",
    name: "SciPy",
    subtitle: "Scientific computing with Python",
    href: "/learn/scipy",
    category: "data",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#005494" />
        <circle cx="16" cy="16" r="8" stroke="#54B4EB" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  {
    id: "aws",
    name: "AWS",
    subtitle: "Amazon cloud services",
    href: "/learn/aws",
    category: "other",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#232F3E" />
        <path d="M9 19c4 2 10 2 14-1" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 16l3 2-2 3" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    id: "cybersecurity",
    name: "Cyber Security",
    subtitle: "Web security fundamentals",
    href: "/learn/cybersecurity",
    category: "other",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#0F172A" />
        <path d="M16 5l9 4v7c0 6-4 10-9 12-5-2-9-6-9-12V9l9-4z" stroke="#38BDF8" strokeWidth="2" fill="none" />
        <path d="M16 11v6m0 3v.5" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "datascience",
    name: "Data Science",
    subtitle: "Analyze and visualize data",
    href: "/learn/datascience",
    category: "data",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#F8FAFC" />
        <path d="M8 23v-6m8 6v-12m8 12v-8" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "git",
    name: "Git",
    subtitle: "Version control system",
    href: "/learn/git",
    category: "other",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#F05032" />
        <circle cx="11" cy="16" r="3" fill="#fff" />
        <circle cx="21" cy="11" r="3" fill="#fff" />
        <circle cx="21" cy="21" r="3" fill="#fff" />
        <path d="M13 16h5m0-5v10" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "kotlin",
    name: "Kotlin",
    subtitle: "Modern Android programming",
    href: "/learn/kotlin",
    category: "mobile",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#7F52FF" />
        <path d="M6 6h10l-10 10V6zm0 20l10-10 10 10H6z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "go",
    name: "Go",
    subtitle: "Fast concurrent backend programming",
    href: "/learn/go",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#00ADD8" />
        <text x="16" y="22" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Go</text>
      </svg>
    ),
  },
  {
    id: "rust",
    name: "Rust",
    subtitle: "Fast, memory-efficient systems language",
    href: "/learn/rust",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#000000" />
        <circle cx="16" cy="16" r="8" stroke="#DEA584" strokeWidth="2" fill="none" />
        <text x="16" y="20" fill="#DEA584" fontSize="11" fontWeight="bold" textAnchor="middle">R</text>
      </svg>
    ),
  },
  {
    id: "php",
    name: "PHP",
    subtitle: "Server-side web scripting language",
    href: "/learn/php",
    category: "backend",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#777BB4" />
        <text x="16" y="21" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">PHP</text>
      </svg>
    ),
  },
  {
    id: "react",
    name: "React",
    subtitle: "Component-based UI library",
    href: "/learn/react",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#20232A" />
        <ellipse cx="16" cy="16" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" />
        <ellipse cx="16" cy="16" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="9" ry="3.5" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    id: "mysql",
    name: "MySQL",
    subtitle: "Relational database management system",
    href: "/learn/mysql",
    category: "database",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#00758F" />
        <text x="16" y="20" fill="#F29111" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">MySQL</text>
      </svg>
    ),
  },
  {
    id: "excel",
    name: "Excel",
    subtitle: "Spreadsheets and data calculations",
    href: "/learn/excel",
    category: "data",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#107C41" />
        <text x="16" y="22" fill="#fff" fontSize="15" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">X</text>
      </svg>
    ),
  },
  {
    id: "r",
    name: "R",
    subtitle: "Statistical computing and graphics",
    href: "/learn/r",
    category: "data",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#276DC3" />
        <text x="16" y="22" fill="#fff" fontSize="15" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">R</text>
      </svg>
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    subtitle: "NoSQL document database",
    href: "/learn/mongodb",
    category: "database",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#13AA52" />
        <path d="M16 6c-3 4-4 8-4 11 0 4 2 7 4 9 2-2 4-5 4-9 0-3-1-7-4-11z" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "w3css",
    name: "W3.CSS",
    subtitle: "Modern CSS framework for faster sites",
    href: "/learn/w3css",
    category: "web",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#04AA6D" />
        <text x="16" y="21" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">W3</text>
      </svg>
    ),
  },
  {
    id: "dsa",
    name: "DSA",
    subtitle: "Data structures and algorithms",
    href: "/learn/dsa",
    category: "other",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#4338CA" />
        <path d="M8 22l8-12 8 12" stroke="#A5B4FC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="8" cy="22" r="2.5" fill="#fff" />
        <circle cx="16" cy="10" r="2.5" fill="#fff" />
        <circle cx="24" cy="22" r="2.5" fill="#fff" />
      </svg>
    ),
  },
  {
    id: "bash",
    name: "Bash",
    subtitle: "Command-line scripting for Linux/Mac",
    href: "/learn/bash",
    category: "other",
    icon: (
      <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
        <rect width="32" height="32" rx="5" fill="#293138" />
        <path d="M8 12l5 4-5 4m8 0h6" stroke="#4EAA25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export const TUTORIAL_TAGS_MAP: Record<string, string[]> = {
  html: ["tag", "tags", "elemen", "element", "form", "formulir", "table", "tabel", "link", "image", "gambar", "button", "tombol", "semantic", "layout", "div", "iframe", "heading", "paragraph", "audio", "video", "canvas", "svg"],
  css: ["style", "styling", "desain", "flexbox", "grid", "selector", "box model", "color", "warna", "font", "margin", "padding", "border", "responsive", "animation", "animasi", "transition", "media query", "layout", "nav", "dropdown", "tables", "forms"],
  javascript: ["js", "script", "function", "fungsi", "loop", "perulangan", "array", "object", "objek", "dom", "event", "promise", "async", "await", "fetch", "api", "es6", "json", "logic", "logika", "variable"],
  sql: ["database", "basis data", "query", "select", "where", "join", "insert", "update", "delete", "table", "tabel", "relational", "crud", "rdbms", "primary key"],
  python: ["backend", "ai", "machine learning", "loop", "perulangan", "function", "fungsi", "list", "dictionary", "tuple", "oop", "class", "script", "data science"],
  java: ["oop", "backend", "class", "object", "spring", "enterprise", "method", "inheritance"],
  c: ["pointer", "memory", "low level", "embedded", "system", "struct"],
  cpp: ["c++", "oop", "pointer", "performance", "game", "system", "class"],
  csharp: ["c#", "csharp", ".net", "dotnet", "backend", "unity", "microsoft", "oop"],
  bootstrap4: ["bootstrap", "css", "framework", "responsive", "grid", "component", "ui"],
  bootstrap5: ["bootstrap", "css", "framework", "responsive", "grid", "component", "ui"],
  nodejs: ["node", "backend", "server", "runtime", "npm", "express", "api", "rest"],
  typescript: ["ts", "javascript", "typed", "type", "interface", "frontend", "backend"],
  django: ["python", "framework", "backend", "web", "orm", "fullstack"],
  postgresql: ["postgres", "sql", "database", "relational", "db", "queries"],
  jquery: ["javascript", "dom", "library", "ajax", "effects"],
  xml: ["data", "markup", "format", "api", "soap", "rss"],
  numpy: ["python", "data", "array", "math", "matrix", "scientific"],
  pandas: ["python", "data", "dataframe", "analysis", "analisis", "csv", "table"],
  howto: ["snippet", "tips", "tricks", "tutorial", "contoh", "css", "js", "html"],
  angular: ["frontend", "framework", "spa", "typescript", "google", "component"],
  swift: ["ios", "apple", "mobile", "macos", "app"],
  sass: ["css", "preprocessor", "scss", "style", "mixins", "variables"],
  vue: ["vuejs", "frontend", "framework", "javascript", "spa", "reactive", "component"],
  genai: ["ai", "chatgpt", "llm", "generative", "prompt", "artificial intelligence", "openai"],
  scipy: ["python", "science", "scientific", "math", "data"],
  aws: ["cloud", "amazon", "server", "hosting", "devops", "ec2", "s3"],
  cybersecurity: ["security", "keamanan", "hacking", "protection", "web security", "crypto"],
  datascience: ["data", "analisis", "analytics", "statistics", "machine learning", "ai"],
  git: ["github", "vcs", "version control", "commit", "branch", "repo"],
  kotlin: ["android", "mobile", "app", "java", "google"],
  go: ["golang", "backend", "concurrency", "goroutine", "fast", "microservices"],
  rust: ["memory safe", "performance", "systems", "low level", "backend"],
  php: ["web", "server", "backend", "wordpress", "laravel"],
  react: ["reactjs", "frontend", "component", "jsx", "hooks", "spa"],
  mysql: ["sql", "database", "db", "relational", "rdbms"],
  excel: ["spreadsheet", "formula", "vlookup", "data", "table", "microsoft"],
  r: ["statistics", "data science", "plots", "charts", "math"],
  mongodb: ["nosql", "database", "document", "json", "bson", "db"],
  w3css: ["css", "framework", "responsive", "lightweight", "vanilla"],
  dsa: ["data structures", "algorithms", "algoritma", "struktur data", "sorting", "tree", "graph"],
  bash: ["terminal", "shell", "linux", "command line", "scripting", "cli"],
};

export interface ChapterSearchItem {
  courseName: string;
  courseSlug: string;
  chapterName: string;
  slug: string;
  badgeBg: string;
  badgeColor: string;
}

export const ALL_SEARCHABLE_CHAPTERS: ChapterSearchItem[] = [
  ...ALL_HTML_CHAPTERS.map((c) => ({
    courseName: "HTML",
    courseSlug: "html",
    chapterName: c.name,
    slug: c.slug,
    badgeBg: "#fee2e2",
    badgeColor: "#dc2626",
  })),
  ...ALL_CSS_CHAPTERS.map((c) => ({
    courseName: "CSS",
    courseSlug: "css",
    chapterName: c.name,
    slug: c.slug,
    badgeBg: "#e0f2fe",
    badgeColor: "#0284c7",
  })),
  ...ALL_JS_CHAPTERS.map((c) => ({
    courseName: "JavaScript",
    courseSlug: "javascript",
    chapterName: c.name,
    slug: c.slug,
    badgeBg: "#fef9c3",
    badgeColor: "#a16207",
  })),
  ...ALL_PYTHON_CHAPTERS.map((c) => ({
    courseName: "Python",
    courseSlug: "python",
    chapterName: c.name,
    slug: c.slug,
    badgeBg: "#e0e7ff",
    badgeColor: "#4338ca",
  })),
  ...ALL_SQL_CHAPTERS.map((c) => ({
    courseName: "SQL",
    courseSlug: "sql",
    chapterName: c.name,
    slug: c.slug,
    badgeBg: "#ecfdf5",
    badgeColor: "#059669",
  })),
];

export const CATEGORY_TABS: { id: "all" | TutorialItem["category"]; label: string }[] = [
  { id: "all", label: "Semua Materi" },
  { id: "web", label: "🌐 Web Dev" },
  { id: "backend", label: "⚙️ Backend" },
  { id: "database", label: "🗄️ Database" },
  { id: "data", label: "📊 Data & AI" },
  { id: "mobile", label: "📱 Mobile" },
  { id: "other", label: "🛠️ Tools" },
];

export const POPULAR_SEARCH_KEYWORDS = [
  "HTML", "CSS", "JavaScript", "Python", "SQL", "Flexbox", "Tables", "Forms", "Loops", "Database"
];

interface TutorialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTech?: string;
}

export function TutorialsModal({ isOpen, onClose, activeTech = "HTML" }: TutorialsModalProps) {
  const [filterQuery, setFilterQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | TutorialItem["category"]>("all");
  const [showFeaturedOnSearch, setShowFeaturedOnSearch] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, onClose]);

  // Match specific chapters across courses (e.g. "table", "flexbox", "loop", "forms")
  const matchingChapters = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return ALL_SEARCHABLE_CHAPTERS.filter((item) => {
      if (selectedCategory !== "all") {
        if (selectedCategory === "web" && !["html", "css", "javascript"].includes(item.courseSlug)) return false;
        if (selectedCategory === "backend" && !["python"].includes(item.courseSlug)) return false;
        if (selectedCategory === "database" && !["sql"].includes(item.courseSlug)) return false;
      }
      return item.chapterName.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q);
    }).slice(0, 8);
  }, [filterQuery, selectedCategory]);

  // Match courses by name, subtitle, category, keywords, or matching chapter topics
  const filteredTutorials = useMemo(() => {
    const q = filterQuery.trim().toLowerCase();

    return ALL_W3_TUTORIALS.filter((item) => {
      // 1. Category check
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      // 2. Direct string checks
      const tags = TUTORIAL_TAGS_MAP[item.id] || [];
      const matchName = item.name.toLowerCase().includes(q);
      const matchSubtitle = item.subtitle.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchTags = tags.some((t) => t.includes(q));

      // 3. Match if any chapter belongs to this technology
      const matchChapter = matchingChapters.some((ch) => ch.courseSlug === item.id);

      return matchName || matchSubtitle || matchCategory || matchTags || matchChapter;
    });
  }, [filterQuery, selectedCategory, matchingChapters]);

  const handleResetFilters = () => {
    setFilterQuery("");
    setSelectedCategory("all");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Katalog Materi Tutorial DevAcademy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(15, 23, 42, 0.72)",
            backdropFilter: "blur(6px)",
            padding: "16px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 350,
              mass: 0.85,
            }}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1060px",
              maxHeight: "92vh",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button X */}
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Tutup Menu Tutorial"
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                position: "absolute",
                top: 16,
                right: 18,
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <X style={{ width: 20, height: 20 }} />
            </motion.button>

            {/* Scrollable Container */}
            <div style={{ overflowY: "auto", padding: "26px 30px 36px 30px" }}>
          
          {/* 1. TOP SECTION (Featured Cards - auto-collapses during search for instant result visibility) */}
          {(!filterQuery.trim() || showFeaturedOnSearch) ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.1fr 1.1fr 1.8fr",
                gap: 16,
                paddingBottom: 22,
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              {/* Card 1: HTML Tutorial / Featured Track */}
              <div
                style={{
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px 16px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                    <svg viewBox="0 0 32 32" width="40" height="40" fill="none">
                      <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#E44D26" />
                      <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#F16529" />
                      <path d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z" fill="#fff" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                    HTML Tutorial
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                    Learn HTML with our tutorial. Free, and easy to follow.
                  </p>
                </div>

                <Link
                  href="/learn/html"
                  onClick={onClose}
                  style={{
                    marginTop: 16,
                    width: "100%",
                    padding: "9px 0",
                    backgroundColor: "#04aa6d",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 750,
                    borderRadius: 6,
                    textAlign: "center",
                    textDecoration: "none",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#038d5a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#04aa6d")}
                >
                  Learn HTML &raquo;
                </Link>
              </div>

              {/* Card 2: 100% Free Learning */}
              <div
                style={{
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px 16px",
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "#e8f5e9",
                      color: "#04aa6d",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px auto",
                    }}
                  >
                    <CheckCircle2 style={{ width: 24, height: 24 }} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px 0" }}>
                    100% Free Access
                  </h3>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
                    Semua materi tutorial bebas diakses tanpa biaya langganan.
                  </p>
                </div>

                <Link
                  href="/dashboard"
                  onClick={onClose}
                  style={{
                    marginTop: 16,
                    width: "100%",
                    padding: "8px 0",
                    backgroundColor: "#ffffff",
                    color: "#0f172a",
                    border: "1.5px solid #0f172a",
                    fontSize: 13,
                    fontWeight: 750,
                    borderRadius: 6,
                    textAlign: "center",
                    textDecoration: "none",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#0f172a";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.color = "#0f172a";
                  }}
                >
                  Mulai Belajar Gratis
                </Link>
              </div>

              {/* Card 3: Interactive Code Lab */}
              <div
                style={{
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "20px 22px",
                  backgroundColor: "#f8fafc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "1px",
                      color: "#64748b",
                      marginBottom: 6,
                    }}
                  >
                    DEVACADEMY INTERACTIVE
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 850, color: "#0f172a", margin: "0 0 6px 0" }}>
                    Try it Yourself Editor
                  </h3>
                  <p style={{ fontSize: 12, color: "#475569", margin: "0 0 14px 0", lineHeight: 1.45, maxWidth: "340px" }}>
                    Setiap materi dilengkapi editor kode interaktif langsung di browser untuk latihan praktis.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link
                    href="/tryit?lang=python&ref=/"
                    onClick={onClose}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 6,
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#334155",
                      textDecoration: "none",
                    }}
                  >
                    🐍 Python Editor
                  </Link>
                  <Link
                    href="/tryit?lang=javascript&ref=/"
                    onClick={onClose}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 6,
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#334155",
                      textDecoration: "none",
                    }}
                  >
                    ⚡ JS Editor
                  </Link>
                  <Link
                    href="/tryit?lang=html&ref=/"
                    onClick={onClose}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 12px",
                      borderRadius: 6,
                      backgroundColor: "#ffffff",
                      border: "1px solid #cbd5e1",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#334155",
                      textDecoration: "none",
                    }}
                  >
                    🌐 HTML / CSS Editor
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                paddingBottom: 14,
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div style={{ fontSize: 12, color: "#64748b" }}>
                💡 Banner unggulan disembunyikan agar hasil pencarian langsung terlihat di layar Anda.
              </div>
              <button
                type="button"
                onClick={() => setShowFeaturedOnSearch(true)}
                style={{
                  fontSize: 12,
                  fontWeight: 650,
                  color: "#04aa6d",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: 4,
                  textDecoration: "underline",
                }}
              >
                Tampilkan banner unggulan
              </button>
            </div>
          )}

          {/* 2. SUBHEADER & FILTER TOOLBAR */}
          <div style={{ marginTop: 20, marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 850,
                    color: "#1e293b",
                    letterSpacing: "0.8px",
                  }}
                >
                  MORE TUTORIALS
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 12,
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                  }}
                >
                  {filteredTutorials.length} materi
                </span>
                {(filterQuery || selectedCategory !== "all") && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#dc2626",
                      backgroundColor: "#fee2e2",
                      border: "none",
                      borderRadius: 6,
                      padding: "2px 8px",
                      cursor: "pointer",
                    }}
                  >
                    <RotateCcw style={{ width: 11, height: 11 }} />
                    Reset
                  </button>
                )}
              </div>

              {/* Enhanced Search Input */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: 380,
                }}
              >
                <Search
                  style={{
                    position: "absolute",
                    left: 12,
                    width: 16,
                    height: 16,
                    color: "#94a3b8",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  placeholder="Cari materi, topik, bab (HTML, Flexbox, Tables)..."
                  style={{
                    width: "100%",
                    padding: "8px 32px 8px 36px",
                    fontSize: 13,
                    borderRadius: 8,
                    border: "1.5px solid #cbd5e1",
                    outline: "none",
                    color: "#0f172a",
                    backgroundColor: "#ffffff",
                    transition: "border-color 0.15s ease",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#04aa6d")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#cbd5e1")}
                />
                {filterQuery && (
                  <button
                    type="button"
                    onClick={() => setFilterQuery("")}
                    aria-label="Clear filter"
                    style={{
                      position: "absolute",
                      right: 10,
                      background: "none",
                      border: "none",
                      color: "#94a3b8",
                      cursor: "pointer",
                      padding: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <X style={{ width: 15, height: 15 }} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                alignItems: "center",
                paddingBottom: 4,
              }}
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab.id;
                const count = tab.id === "all"
                  ? ALL_W3_TUTORIALS.length
                  : ALL_W3_TUTORIALS.filter((t) => t.category === tab.id).length;

                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "5px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: isActive ? 750 : 550,
                      border: isActive ? "1.5px solid #04aa6d" : "1px solid #e2e8f0",
                      backgroundColor: isActive ? "#e8f5e9" : "#ffffff",
                      color: isActive ? "#04aa6d" : "#475569",
                      cursor: "pointer",
                      transition: "background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease",
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      style={{
                        fontSize: 10.5,
                        opacity: 0.8,
                        backgroundColor: isActive ? "#c8e6c9" : "#f1f5f9",
                        color: isActive ? "#1b5e20" : "#64748b",
                        padding: "1px 6px",
                        borderRadius: 10,
                      }}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 3. INSTANT CHAPTER / TOPIC MATCHES (e.g. "tables", "flexbox", "loops", "forms") */}
          <AnimatePresence>
            {matchingChapters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -6, height: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  marginBottom: 20,
                  padding: "14px 16px",
                  backgroundColor: "#f8fafc",
                  borderRadius: 12,
                  border: "1.5px solid #e2e8f0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontSize: 12.5,
                    fontWeight: 800,
                    color: "#1e293b",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Sparkles style={{ width: 15, height: 15, color: "#04aa6d" }} />
                    <span>Topik & Bab Spesifik Terkait ({matchingChapters.length} bab ditemukan):</span>
                  </div>
                  <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>
                    Klik untuk langsung membuka bab tutorial
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {matchingChapters.map((ch) => (
                    <motion.div
                      key={`${ch.courseSlug}-${ch.slug}`}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={`/learn/${ch.courseSlug}/${ch.slug}`}
                        onClick={onClose}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 12px",
                          borderRadius: 8,
                          backgroundColor: "#ffffff",
                          border: "1px solid #cbd5e1",
                          fontSize: 12,
                          fontWeight: 650,
                          color: "#0f172a",
                          textDecoration: "none",
                          transition: "border-color 0.15s ease, background-color 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#04aa6d";
                          e.currentTarget.style.backgroundColor = "#f0fdf4";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#cbd5e1";
                          e.currentTarget.style.backgroundColor = "#ffffff";
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            padding: "2px 6px",
                            borderRadius: 4,
                            backgroundColor: ch.badgeBg,
                            color: ch.badgeColor,
                            letterSpacing: "0.5px",
                          }}
                        >
                          {ch.courseName}
                        </span>
                        <span>{ch.chapterName}</span>
                        <ChevronRight style={{ width: 13, height: 13, color: "#94a3b8" }} />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. ALL TUTORIALS 4-COLUMN GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}
          >
            {filteredTutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Link
                  href={tutorial.href}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "18px 14px",
                    borderRadius: 10,
                    border: "1.5px solid #e2e8f0",
                    backgroundColor: "#ffffff",
                    textDecoration: "none",
                    transition: "border-color 0.16s ease, box-shadow 0.16s ease",
                    cursor: "pointer",
                    position: "relative",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#04aa6d";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(4, 170, 109, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {tutorial.icon}
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 750,
                      color: "#0f172a",
                      marginBottom: 4,
                    }}
                  >
                    {tutorial.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "#64748b",
                      lineHeight: 1.35,
                    }}
                  >
                    {tutorial.subtitle}
                  </div>
                </Link>
              </motion.div>
            ))}

            {filteredTutorials.length === 0 && matchingChapters.length === 0 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "40px 16px",
                  backgroundColor: "#f8fafc",
                  borderRadius: 12,
                  border: "1px dashed #cbd5e1",
                }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 6 }}>
                  Tidak ada materi atau bab yang cocok dengan &quot;{filterQuery}&quot;
                </div>
                <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 16px 0" }}>
                  Coba gunakan kata kunci populer atau klik salah satu rekomendasi berikut:
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, maxWidth: 500, margin: "0 auto 16px auto" }}>
                  {POPULAR_SEARCH_KEYWORDS.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setFilterQuery(kw.toLowerCase())}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 6,
                        backgroundColor: "#ffffff",
                        border: "1px solid #cbd5e1",
                        fontSize: 12,
                        fontWeight: 650,
                        color: "#334155",
                        cursor: "pointer",
                      }}
                    >
                      {kw}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 6,
                    backgroundColor: "#04aa6d",
                    color: "#ffffff",
                    border: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Reset Filter &amp; Tampilkan Semua
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
