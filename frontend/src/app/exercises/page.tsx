"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Search, ArrowRight, Code2, Layers, CheckCircle2 } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { DarkFooter } from "@/components/landing/DarkFooter";
import { useAuth } from "@/context/AuthContext";
import { getFullExerciseProgress } from "@/lib/user-progress-store";
import { normalizeTechKey } from "@/lib/w3-all-courses-catalog";

interface ExerciseCardItem {
  id: string;
  name: string;
  slug: string;
  category: "web" | "prog" | "data" | "db";
  desc: string;
  icon: React.ReactNode;
}

export default function ExercisesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [answeredCountMap, setAnsweredCountMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const computeProgress = () => {
      const next: Record<string, number> = {};
      for (const item of exerciseItems) {
        const norm = normalizeTechKey(item.slug);
        const saved = getFullExerciseProgress(user?.email, norm);
        if (saved && saved.submittedMap) {
          const count = Object.values(saved.submittedMap).filter(Boolean).length;
          if (count > 0) {
            next[item.slug] = count;
          }
        }
      }
      setAnsweredCountMap(next);
    };
    computeProgress();
    window.addEventListener("devacademy-cloud-synced", computeProgress);
    return () => window.removeEventListener("devacademy-cloud-synced", computeProgress);
  }, [user?.email]);

  const exerciseItems: ExerciseCardItem[] = [
    {
      id: "html",
      name: "HTML",
      slug: "html",
      category: "web",
      desc: "The building blocks of every webpage",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#E44D26"/>
          <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#F16529"/>
          <path d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "css",
      name: "CSS",
      slug: "css",
      category: "web",
      desc: "Style and layout for web pages",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#1572B6"/>
          <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#33A9DC"/>
          <path d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "javascript",
      name: "JavaScript",
      slug: "javascript",
      category: "web",
      desc: "Interactive and dynamic web pages",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30">
          <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
          <path d="M18.8 25.2c.7 1.2 1.8 2 3.5 2 2 0 3.2-1 3.2-2.5 0-1.8-1.5-2.4-3.8-3.4-3.3-1.4-5.5-3.1-5.5-6.8 0-3.4 2.6-6 6.6-6 2.9 0 4.9 1.1 6.2 3.4l-3.2 2.1c-.7-1.3-1.6-1.8-3-1.8-1.4 0-2.3.9-2.3 2 0 1.4 1 2 3.3 3 3.8 1.6 6.1 3.2 6.1 7.2 0 4.1-3.2 6.6-7.5 6.6-4.1 0-6.7-2-7.8-4.6l4.2-2.2zM7.2 22.8c.4.8.9 1.4 1.8 1.9 1.2.6 2.3.5 3.1-.2 1.1-1 1-2.9 1-5.7V8.5h4.4v10.5c0 3.6-.3 5.9-2.2 7.5-1.9 1.6-4.7 1.7-7.2.7-2-.8-3.2-2.5-3.7-4.4h2.8z" fill="#000"/>
        </svg>
      ),
    },
    {
      id: "sql",
      name: "SQL",
      slug: "sql",
      category: "db",
      desc: "Query and manage databases",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <ellipse cx="16" cy="7" rx="10" ry="4" fill="#0284C7"/>
          <path d="M6 7v8c0 2.2 4.5 4 10 4s10-1.8 10-4V7" stroke="#0284C7" strokeWidth="2.2" fill="#E0F2FE"/>
          <path d="M6 15v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" stroke="#0284C7" strokeWidth="2.2" fill="#E0F2FE"/>
        </svg>
      ),
    },
    {
      id: "python",
      name: "Python",
      slug: "python",
      category: "prog",
      desc: "Popular language for web, data & AI",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M15.8 2c-6.8 0-6.4 3-6.4 3l.01 3.1h6.5v.9H6.4S2 8.5 2 15.3c0 6.9 3.8 6.6 3.8 6.6h2.3v-3.2s-.1-3.8 3.8-3.8h6.5s3.6.1 3.6-3.6V5.6S22.6 2 15.8 2zm-3.6 2.4c.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3z" fill="#387EB8"/>
          <path d="M16.2 30c6.8 0 6.4-3 6.4-3l-.01-3.1h-6.5v-.9h9.5s4.4.5 4.4-6.3c0-6.9-3.8-6.6-3.8-6.6h-2.3v3.2s.1 3.8-3.8 3.8h-6.5s-3.6-.1-3.6 3.6v5.7s-.6 3.6 6.2 3.6zm3.6-2.4c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3z" fill="#FFE873"/>
        </svg>
      ),
    },
    {
      id: "java",
      name: "Java",
      slug: "java",
      category: "prog",
      desc: "Object-oriented programming language",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M12.5 25.5s-2 1.5 1.5 2c4.2.6 8.5.5 12.5-.5 0 0 1.5-.9-1.5-1.5-3.5-.7-8.5-.7-12.5 0z" fill="#EA2D2E"/>
          <path d="M10.5 22.5s-2.5 2 2 2.5c5.5.6 12 .5 17-.6 0 0 1.5-1.4-2.5-2-4.5-.6-11.5-.7-16.5.1z" fill="#EA2D2E"/>
          <path d="M18.5 15.5c2 .2 3.8 1.2 3.5 2.8-.4 2.2-2.8 3.5-5.5 3.5-3.8 0-6.5-1.8-4.5-4.5 1.4-1.8 4.5-2 6.5-1.8z" fill="#5382A1"/>
          <path d="M21.5 8.5c1.5 1.8 0 3.5-1.5 4.5-1.5 1-3 1.8-2 3 1.2 1.5 2.5 1 4-.5 2-2 2.5-4.5-.5-7z" fill="#5382A1"/>
        </svg>
      ),
    },
    {
      id: "c",
      name: "C",
      slug: "c",
      category: "prog",
      desc: "A powerful general-purpose language",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#64748B"/>
          <path d="M21.5 10.5c-1.5-1.2-3.4-1.8-5.5-1.8-4.7 0-8.5 3.3-8.5 7.3s3.8 7.3 8.5 7.3c2.1 0 4-.6 5.5-1.8v-3.2c-1.4 1.2-3 1.8-4.6 1.8-3 0-5.4-2-5.4-4.1s2.4-4.1 5.4-4.1c1.6 0 3.2.6 4.6 1.8v-3.2z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "cpp",
      name: "C++",
      slug: "cpp",
      category: "prog",
      desc: "The language behind games & engines",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#00599C"/>
          <path d="M17 10c-1.2-.9-2.7-1.4-4.4-1.4-3.8 0-6.8 2.6-6.8 5.8s3 5.8 6.8 5.8c1.7 0 3.2-.5 4.4-1.4v-2.5c-1.1 1-2.4 1.4-3.7 1.4-2.4 0-4.3-1.6-4.3-3.3s1.9-3.3 4.3-3.3c1.3 0 2.6.4 3.7 1.4V10z" fill="#fff"/>
          <path d="M20 13h1.5v-1.5h1V13H24v1h-1.5v1.5h-1V14H20v-1zM25 13h1.5v-1.5h1V13H29v1h-1.5v1.5h-1V14H25v-1z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "csharp",
      name: "C#",
      slug: "csharp",
      category: "prog",
      desc: "Build apps, games and web services",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M16 3l12 7v12l-12 7-12-7V10l12-7z" fill="#9B4F96"/>
          <path d="M18 10.5c-1.1-.9-2.5-1.4-4-1.4-3.5 0-6.3 2.5-6.3 5.5s2.8 5.5 6.3 5.5c1.5 0 2.9-.5 4-1.4v-2.4c-1 .9-2.2 1.4-3.4 1.4-2.2 0-4-1.5-4-3.1s1.8-3.1 4-3.1c1.2 0 2.4.5 3.4 1.4v-2.4z" fill="#fff"/>
          <path d="M20.5 13.5h1.2v-1.2h.9v1.2h1.2v.8h-1.2v1.2h-.9v-1.2h-1.2v-.8zM24 13.5h1.2v-1.2h.9v1.2h1.2v.8h-1.2v1.2h-.9v-1.2H24v-.8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "php",
      name: "PHP",
      slug: "php",
      category: "web",
      desc: "Server-side scripting language",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <ellipse cx="16" cy="16" rx="14" ry="10" fill="#777BB4"/>
          <path d="M10 12.5h3c1.5 0 2.5.8 2.5 2s-1 2-2.5 2h-1.5v2.5H10v-6.5zm1.5 1.2v1.6h1.5c.8 0 1.2-.3 1.2-.8s-.4-.8-1.2-.8h-1.5z" fill="#fff"/>
          <path d="M18 12.5h1.5v2.5h2v-2.5H23v6.5h-1.5v-2.8h-2v2.8H18v-6.5z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "react",
      name: "React",
      slug: "react",
      category: "web",
      desc: "Build interactive user interfaces",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.8"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(60 16 16)"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(120 16 16)"/>
        </svg>
      ),
    },
    {
      id: "mysql",
      name: "MySQL",
      slug: "mysql",
      category: "db",
      desc: "Store and manage relational data",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M5 24c4-3 7-8 10-10 2-1 4-1 6 0 3 2 4 5 7 7-3 2-7 2-11 1-4-1-8 0-12 2z" fill="#00758F"/>
          <path d="M16 14c-1-3 1-6 4-7 1 2 2 4 1 6-2 1-3 1-5 1z" fill="#F29111"/>
          <ellipse cx="16" cy="18" rx="10" ry="4" stroke="#00758F" strokeWidth="2" fill="none"/>
        </svg>
      ),
    },
    {
      id: "nodejs",
      name: "Node.js",
      slug: "nodejs",
      category: "web",
      desc: "Server-side JavaScript runtime",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M16 3l12 7v12l-12 7-12-7V10l12-7z" fill="#5FA04E"/>
          <path d="M16 8l8 5v6l-8 5-8-5v-6l8-5z" fill="#333333"/>
          <path d="M16 13l4 2.5v3l-4 2.5-4-2.5v-3l4-2.5z" fill="#ffffff"/>
        </svg>
      ),
    },
    {
      id: "typescript",
      name: "TypeScript",
      slug: "typescript",
      category: "web",
      desc: "Typed JavaScript at any scale",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30">
          <rect width="32" height="32" rx="4" fill="#3178C6"/>
          <path d="M14 11h-3.5v2h2.5v9h2v-9H17.5v-2zM21.5 13.5c-.8-.4-1.6-.6-2.5-.6-1.5 0-2.5.8-2.5 2 0 1.3 1 1.8 2.2 2.3l.8.3c1.6.6 2.5 1.3 2.5 2.8 0 1.8-1.5 3-3.6 3-1.2 0-2.3-.4-3.2-1l.7-1.7c.8.5 1.7.9 2.6.9 1.2 0 1.8-.6 1.8-1.3 0-.9-.8-1.4-2.2-2l-.8-.3c-1.5-.6-2.4-1.4-2.4-2.7 0-1.8 1.4-3.1 3.5-3.1 1.1 0 2 .3 2.7.7l-.6 1.7z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "git",
      name: "Git",
      slug: "git",
      category: "prog",
      desc: "Version control and branching",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#F05032"/>
          <path d="M22 14l-4-4a2 2 0 00-2.8 0l-1.5 1.5 2.2 2.2a2 2 0 012.3 2.3l2.2 2.2c.4-.1.8-.2 1.2-.2a2.5 2.5 0 11-2.5 2.5c0-.4.1-.8.2-1.2l-2.2-2.2v4.8a2.5 2.5 0 11-2 0v-6.3a2.5 2.5 0 011.3-4.5c.4 0 .8.1 1.2.2L12 9l-4 4a2 2 0 000 2.8l8 8a2 2 0 002.8 0l3.2-3.2a2 2 0 000-2.8l-8-8" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      slug: "bootstrap",
      category: "web",
      desc: "Responsive mobile-first CSS framework",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30">
          <rect width="32" height="32" rx="6" fill="#7952B3"/>
          <path d="M12 9h4.5c2.2 0 3.5 1 3.5 2.5 0 1.2-.8 2-1.8 2.3 1.4.3 2.3 1.3 2.3 2.7 0 1.8-1.5 3-4 3H12V9zm2.4 4h2c.8 0 1.3-.4 1.3-1s-.5-1-1.3-1h-2v2zm0 4.5h2.2c.9 0 1.5-.4 1.5-1.1 0-.7-.6-1.1-1.5-1.1h-2.2v2.2z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "jquery",
      name: "jQuery",
      slug: "jquery",
      category: "web",
      desc: "Fast, small JavaScript library",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#0769AD"/>
          <path d="M8 12c3 2 7 2 10 0s4 2 2 5-6 6-10 4 2-5-2-9z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "excel",
      name: "Excel",
      slug: "excel",
      category: "data",
      desc: "Spreadsheets and data analysis",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="28" height="26" x="2" y="3" rx="4" fill="#107C41"/>
          <path d="M8 8l6 7-6 7h3.5l4-5 4 5H23l-6-7 6-7h-3.5l-4 5-4-5H8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "dsa",
      name: "DSA",
      slug: "dsa",
      category: "prog",
      desc: "Data Structures & Algorithms",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="7" r="4" fill="#0284C7"/>
          <circle cx="8" cy="23" r="4" fill="#0284C7"/>
          <circle cx="24" cy="23" r="4" fill="#0284C7"/>
          <line x1="14" y1="10" x2="10" y2="20" stroke="#0284C7" strokeWidth="2.2"/>
          <line x1="18" y1="10" x2="22" y2="20" stroke="#0284C7" strokeWidth="2.2"/>
        </svg>
      ),
    },
    {
      id: "django",
      name: "Django",
      slug: "django",
      category: "web",
      desc: "High-level Python web framework",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#092E20"/>
          <path d="M12 9h3v8c0 2-1 3-3 3h-1v-2h1c.8 0 1-.4 1-1v-8zm5 4h3v7h-3v-7zm0-3h3v2h-3v-2z" fill="#44B78B"/>
        </svg>
      ),
    },
    {
      id: "numpy",
      name: "NumPy",
      slug: "numpy",
      category: "data",
      desc: "Scientific and matrix computing",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="28" height="28" x="2" y="2" rx="4" fill="#013243"/>
          <path d="M8 8h3l7 12V8h3v16h-3L11 12v12H8V8z" fill="#4DABCF"/>
        </svg>
      ),
    },
    {
      id: "pandas",
      name: "Pandas",
      slug: "pandas",
      category: "data",
      desc: "Data analysis and manipulation",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="28" height="28" x="2" y="2" rx="4" fill="#150458"/>
          <path d="M8 7h3v18H8V7zm6 4h3v14h-3V11zm6 4h3v10h-3V15z" fill="#E70488"/>
        </svg>
      ),
    },
    {
      id: "mongodb",
      name: "MongoDB",
      slug: "mongodb",
      category: "db",
      desc: "Popular NoSQL document database",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M16 3C16 3 9 10 9 17c0 4.5 3 8 7 9 4-1 7-4.5 7-9 0-7-7-14-7-14z" fill="#13AA52"/>
          <path d="M16 3v23c.3 0 .7 0 1-.1 3.5-.9 6-4.2 6-8.9 0-7-7-14-7-14z" fill="#116149"/>
        </svg>
      ),
    },
    {
      id: "go",
      name: "Go",
      slug: "go",
      category: "prog",
      desc: "Fast, concurrent systems programming",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#00ADD8"/>
          <path d="M9 16c0-3.5 2.5-6 6-6 2 0 3.5.8 4.5 2l-1.8 1.8c-.7-.8-1.6-1.3-2.7-1.3-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5c1.5 0 2.5-.7 3-1.8H14v-2.2h6.5v4.5c-1.3 1.8-3.2 2.5-5.5 2.5-3.5 0-6-2.5-6-6z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "rust",
      name: "Rust",
      slug: "rust",
      category: "prog",
      desc: "Memory-safe performance programming",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#000000"/>
          <circle cx="16" cy="16" r="11" stroke="#CE412B" strokeWidth="2.5"/>
          <path d="M12 11h4.5c1.5 0 2.5.8 2.5 2 0 .8-.5 1.5-1.3 1.8L20 21h-2.5l-2-5.5h-1.5V21H12V11zm2.4 4h2c.6 0 1-.3 1-.8s-.4-.8-1-.8h-2V15z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "kotlin",
      name: "Kotlin",
      slug: "kotlin",
      category: "prog",
      desc: "Modern multiplatform & Android language",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M3 3h26L16 16l13 13H3V3z" fill="#7F52FF"/>
          <path d="M3 3l13 13L3 29V3z" fill="#C757BC"/>
          <path d="M3 29l13-13 13 13H3z" fill="#0095D5"/>
        </svg>
      ),
    },
    {
      id: "xml",
      name: "XML",
      slug: "xml",
      category: "data",
      desc: "Structured data exchange standard",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#E95420"/>
          <path d="M9 11l5 10h-2.5L9.5 17 7.5 21H5l5-10h-1zM21 11l-3 6 3 6h-2.5l-2-4.5-2 4.5H12l3-6-3-6h2.5l2 4.5 2-4.5H21z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "angular",
      name: "Angular",
      slug: "angular",
      category: "web",
      desc: "Web development framework by Google",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M16 3l12 4-2 15-10 7-10-7-2-15 12-4z" fill="#DD0031"/>
          <path d="M16 3v26l10-7 2-15-12-4z" fill="#C3002F"/>
          <path d="M16 7l-7 15h3l1.5-3.5h5L20 22h3L16 7zm1.5 9h-3L16 11.5 17.5 16z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "vue",
      name: "Vue",
      slug: "vue",
      category: "web",
      desc: "Progressive JavaScript UI framework",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <path d="M16 26L3 4h5.5L16 17 23.5 4H29L16 26z" fill="#41B883"/>
          <path d="M16 20L8.5 7H13l3 5.5 3-5.5h4.5L16 20z" fill="#35495E"/>
        </svg>
      ),
    },
    {
      id: "swift",
      name: "Swift",
      slug: "swift",
      category: "prog",
      desc: "Modern language for iOS and macOS",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#F05138"/>
          <path d="M24 16c-3 4-8 7-13 8 4-2 7-5 8-8-4 3-8 4-12 3 6-4 10-9 10-15 1 2 2 4 2 6 2-3 2-6 2-8 3 5 4 10 3 14z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      slug: "postgresql",
      category: "db",
      desc: "Advanced open source relational DB",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#336791"/>
          <path d="M16 6c-5 0-9 4-9 9 0 3 1.5 6 4 7.5v2.5l4-2 4 2v-2.5c2.5-1.5 4-4.5 4-7.5 0-5-4-9-9-9z" fill="#fff" opacity="0.9"/>
        </svg>
      ),
    },
    {
      id: "sass",
      name: "Sass",
      slug: "sass",
      category: "web",
      desc: "CSS with superpowers & extensions",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#CC6699"/>
          <path d="M16 11c-3 0-5 1.5-5 3.5 0 3 6 2 6 4.5s-2 3-4.5 3c-2 0-3.5-.8-4.5-2l1.8-1.5c.7.8 1.6 1.3 2.7 1.3 1.5 0 2.2-.6 2.2-1.3 0-3-6-2-6-4.5S10.7 11 13.5 11c1.8 0 3 .6 4 1.6l-1.5 1.4c-.7-.7-1.5-1-2-1z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "bash",
      name: "Bash",
      slug: "bash",
      category: "prog",
      desc: "Command line scripting for Linux & Unix",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#293138"/>
          <path d="M8 12l5 4-5 4m8 0h6" stroke="#4EAA25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "scipy",
      name: "SciPy",
      slug: "scipy",
      category: "data",
      desc: "Scientific computing library for Python",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#0054A6"/>
          <path d="M10 20c3-2 5-6 6-10 1 4 3 8 6 10-3 1-5 2-6 2s-3-1-6-2z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "r",
      name: "R",
      slug: "r",
      category: "data",
      desc: "Statistical computing and graphics",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#276DC3"/>
          <path d="M10 8h6c3 0 5 1.5 5 4s-2 4-5 4h-2.5l5 8h-3.5l-4.5-7.5H13V24h-3V8zm3 2.5v5.5h3c1.5 0 2.5-.8 2.5-2.7s-1-2.8-2.5-2.8h-3z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "aws",
      name: "AWS",
      slug: "aws",
      category: "data",
      desc: "Cloud computing and web hosting services",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#232F3E"/>
          <path d="M8 20c5 3 11 3 16 0" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M10 13l2 4 2-4m3 0l1 4 1-4" stroke="#fff" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      id: "w3css",
      name: "W3.CSS",
      slug: "w3css",
      category: "web",
      desc: "Modern CSS framework for faster web pages",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#04AA6D"/>
          <text x="16" y="21" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">W3</text>
        </svg>
      ),
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      slug: "cybersecurity",
      category: "data",
      desc: "Protect computer systems and networks",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#0F172A"/>
          <path d="M16 6l9 4v7c0 6-4 10-9 12-5-2-9-6-9-12v-7l9-4z" fill="#10B981"/>
          <path d="M14 16l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "datascience",
      name: "Data Science",
      slug: "datascience",
      category: "data",
      desc: "Extract insights from complex structured data",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#6366F1"/>
          <rect x="8" y="17" width="3" height="7" fill="#fff"/>
          <rect x="13" y="13" width="3" height="11" fill="#fff"/>
          <rect x="18" y="9" width="3" height="15" fill="#fff"/>
          <rect x="23" y="15" width="3" height="9" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "ai",
      name: "AI",
      slug: "ai",
      category: "data",
      desc: "Artificial intelligence fundamentals & ML",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#8B5CF6"/>
          <circle cx="16" cy="16" r="5" fill="#fff"/>
          <line x1="16" y1="5" x2="16" y2="9" stroke="#fff" strokeWidth="2.5"/>
          <line x1="16" y1="23" x2="16" y2="27" stroke="#fff" strokeWidth="2.5"/>
          <line x1="5" y1="16" x2="9" y2="16" stroke="#fff" strokeWidth="2.5"/>
          <line x1="23" y1="16" x2="27" y2="16" stroke="#fff" strokeWidth="2.5"/>
        </svg>
      ),
    },
    {
      id: "gen-ai",
      name: "Gen AI",
      slug: "gen-ai",
      category: "data",
      desc: "Generative AI, prompts and LLM tech",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#EC4899"/>
          <path d="M16 8l2.5 5.5L24 16l-5.5 2.5L16 24l-2.5-5.5L8 16l5.5-2.5L16 8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      id: "howto",
      name: "How To",
      slug: "howto",
      category: "web",
      desc: "Practical web component code recipes",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#04AA6D"/>
          <path d="M16 10v6l4 3" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "intro-programming",
      name: "Intro to Programming",
      slug: "intro-programming",
      category: "prog",
      desc: "Fundamentals of coding and logic",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#0284C7"/>
          <path d="M12 11l-4 5 4 5m8-10l4 5-4 5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "intro-html-css",
      name: "Intro to HTML & CSS",
      slug: "intro-html-css",
      category: "web",
      desc: "Beginner starter guide for web makers",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <rect width="30" height="30" x="1" y="1" rx="6" fill="#F97316"/>
          <path d="M10 11l-3 5 3 5m12-10l3 5-3 5m-8 1l2-12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "tools",
      name: "Tools",
      slug: "tools",
      category: "prog",
      desc: "Essential dev tools, linters & utilities",
      icon: (
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
          <circle cx="16" cy="16" r="14" fill="#475569"/>
          <path d="M11 21l8-8m2-2a2.8 2.8 0 00-4 0l-1 1 4 4 1-1a2.8 2.8 0 000-4z" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  const filteredItems = useMemo(() => {
    return exerciseItems.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.desc.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="w3-exercise-page-root">
      {/* 1. Header with Navbar */}
      <LandingHeader />

      {/* 2. Hero Section */}
      <section className="w3-exercise-hero">
        <div className="w3-exercise-hero-container">
          <h1 className="w3-exercise-title">Pilih Modul Latihan Coding</h1>

          {/* Quick Search Input */}
          <div className="w3-exercise-search-box">
            <Search className="w3-exercise-search-icon" />
            <input
              type="text"
              placeholder="Cari latihan (HTML, Python, React, SQL...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w3-exercise-search-input"
            />
          </div>
        </div>
      </section>

      {/* 3. Filter Category Pills & Compact Grid */}
      <section className="w3-exercise-grid-section">
        {/* Category Filter Pills */}
        <div className="w3-exercise-category-pills">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`w3-exercise-cat-pill ${selectedCategory === "all" ? "active" : ""}`}
          >
            Semua ({exerciseItems.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("web")}
            className={`w3-exercise-cat-pill ${selectedCategory === "web" ? "active" : ""}`}
          >
            Web Development
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("prog")}
            className={`w3-exercise-cat-pill ${selectedCategory === "prog" ? "active" : ""}`}
          >
            Programming
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("db")}
            className={`w3-exercise-cat-pill ${selectedCategory === "db" ? "active" : ""}`}
          >
            Database
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("data")}
            className={`w3-exercise-cat-pill ${selectedCategory === "data" ? "active" : ""}`}
          >
            Data Science & Tools
          </button>
        </div>

        {/* Compact Cards Grid Matching User Screenshot */}
        <div className="w3-exercise-compact-grid">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/exercises/${item.slug}`}
              className="w3-exercise-compact-card"
              title={`Mulai latihan lengkap ${item.name}`}
            >
              <div className="w3-exercise-card-icon">
                {item.icon}
              </div>

              <h2 className="w3-exercise-card-title">{item.name}</h2>
              <p className="w3-exercise-card-subtitle">{item.desc}</p>

              {answeredCountMap[item.slug] ? (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "#04aa6d",
                    background: "rgba(4, 170, 109, 0.12)",
                    border: "1px solid rgba(4, 170, 109, 0.3)",
                    padding: "3px 10px",
                    borderRadius: 12,
                    marginBottom: 8,
                  }}
                >
                  <CheckCircle2 style={{ width: 12, height: 12 }} />
                  <span>{answeredCountMap[item.slug]} Soal Dijawab</span>
                </div>
              ) : null}

              <div className="w3-exercise-card-cta">
                <span>{answeredCountMap[item.slug] ? "Lanjutkan Latihan" : "Buka Soal Latihan"}</span>
                <ArrowRight style={{ width: 12, height: 12 }} />
              </div>
            </Link>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
            <p style={{ fontSize: 16, fontWeight: 600 }}>Tidak ada modul latihan yang sesuai dengan &ldquo;{search}&rdquo;</p>
            <button
              type="button"
              onClick={() => { setSearch(""); setSelectedCategory("all"); }}
              style={{
                marginTop: 10,
                background: "#04aa6d",
                color: "#ffffff",
                border: "none",
                padding: "8px 18px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Reset Pencarian
            </button>
          </div>
        )}
      </section>

      {/* 4. Footer */}
      <DarkFooter />
    </div>
  );
}
