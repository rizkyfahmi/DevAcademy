"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { TutorialsModal } from "./TutorialsModal";

interface LanguageCardData {
  title: string;
  subtitle: string;
  href: string;
  iconBg?: string;
  svgIcon: React.ReactNode;
}

export function AllLanguagesSection() {
  const [tutorialsModalOpen, setTutorialsModalOpen] = useState(false);
  const languages: LanguageCardData[] = [
    {
      title: "HTML",
      subtitle: "The building blocks of every webpage",
      href: "/learn/html",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#E44D26"/>
          <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#F16529"/>
          <path d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      title: "CSS",
      subtitle: "Style and layout for web pages",
      href: "/learn/css",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <path d="M4 3l2.6 25 9.4 3 9.4-3L28 3H4z" fill="#1572B6"/>
          <path d="M16 28.6l7.4-2.4 2.2-20.8H16v23.2z" fill="#33A9DC"/>
          <path d="M9.8 10.4h12.4l-.3 3.2h-8.8l.3 3.2h8.2l-.8 8.6-5.6 1.8-5.6-1.8-.4-4.2h3.2l.2 2 2.6.8 2.6-.8.4-4H9.4l.4-4.8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      title: "JavaScript",
      subtitle: "Interactive and dynamic web pages",
      href: "/learn/javascript",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36">
          <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
          <path d="M18.8 25.2c.7 1.2 1.8 2 3.5 2 2 0 3.2-1 3.2-2.5 0-1.8-1.5-2.4-3.8-3.4-3.3-1.4-5.5-3.1-5.5-6.8 0-3.4 2.6-6 6.6-6 2.9 0 4.9 1.1 6.2 3.4l-3.2 2.1c-.7-1.3-1.6-1.8-3-1.8-1.4 0-2.3.9-2.3 2 0 1.4 1 2 3.3 3 3.8 1.6 6.1 3.2 6.1 7.2 0 4.1-3.2 6.6-7.5 6.6-4.1 0-6.7-2-7.8-4.6l4.2-2.2zM7.2 22.8c.4.8.9 1.4 1.8 1.9 1.2.6 2.3.5 3.1-.2 1.1-1 1-2.9 1-5.7V8.5h4.4v10.5c0 3.6-.3 5.9-2.2 7.5-1.9 1.6-4.7 1.7-7.2.7-2-.8-3.2-2.5-3.7-4.4h2.8z" fill="#000"/>
        </svg>
      ),
    },
    {
      title: "SQL",
      subtitle: "Query and manage databases",
      href: "/learn/sql",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <ellipse cx="16" cy="7" rx="10" ry="4" fill="#0284C7"/>
          <path d="M6 7v8c0 2.2 4.5 4 10 4s10-1.8 10-4V7" stroke="#0284C7" strokeWidth="2.5" fill="#E0F2FE"/>
          <path d="M6 15v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" stroke="#0284C7" strokeWidth="2.5" fill="#E0F2FE"/>
        </svg>
      ),
    },
    {
      title: "Python",
      subtitle: "Popular language for web, data & AI",
      href: "/learn/python",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <path d="M15.8 2c-6.8 0-6.4 3-6.4 3l.01 3.1h6.5v.9H6.4S2 8.5 2 15.3c0 6.9 3.8 6.6 3.8 6.6h2.3v-3.2s-.1-3.8 3.8-3.8h6.5s3.6.1 3.6-3.6V5.6S22.6 2 15.8 2zm-3.6 2.4c.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3z" fill="#387EB8"/>
          <path d="M16.2 30c6.8 0 6.4-3 6.4-3l-.01-3.1h-6.5v-.9h9.5s4.4.5 4.4-6.3c0-6.9-3.8-6.6-3.8-6.6h-2.3v3.2s.1 3.8-3.8 3.8h-6.5s-3.6-.1-3.6 3.6v5.7s-.6 3.6 6.2 3.6zm3.6-2.4c-.7 0-1.3-.6-1.3-1.3 0-.7.6-1.3 1.3-1.3.7 0 1.3.6 1.3 1.3 0 .7-.6 1.3-1.3 1.3z" fill="#FFE873"/>
        </svg>
      ),
    },
    {
      title: "Java",
      subtitle: "Object-oriented programming language",
      href: "/learn/java",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <path d="M12.5 25.5s-2 1.5 1.5 2c4.2.6 8.5.5 12.5-.5 0 0 1.5-.9-1.5-1.5-3.5-.7-8.5-.7-12.5 0z" fill="#EA2D2E"/>
          <path d="M10.5 22.5s-2.5 2 2 2.5c5.5.6 12 .5 17-.6 0 0 1.5-1.4-2.5-2-4.5-.6-11.5-.7-16.5.1z" fill="#EA2D2E"/>
          <path d="M18.5 15.5c2 .2 3.8 1.2 3.5 2.8-.4 2.2-2.8 3.5-5.5 3.5-3.8 0-6.5-1.8-4.5-4.5 1.4-1.8 4.5-2 6.5-1.8z" fill="#5382A1"/>
          <path d="M21.5 8.5c1.5 1.8 0 3.5-1.5 4.5-1.5 1-3 1.8-2 3 1.2 1.5 2.5 1 4-.5 2-2 2.5-4.5-.5-7z" fill="#5382A1"/>
        </svg>
      ),
    },
    {
      title: "C",
      subtitle: "A powerful general-purpose language",
      href: "/learn/c",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <circle cx="16" cy="16" r="14" fill="#64748B"/>
          <path d="M21.5 10.5c-1.5-1.2-3.4-1.8-5.5-1.8-4.7 0-8.5 3.3-8.5 7.3s3.8 7.3 8.5 7.3c2.1 0 4-.6 5.5-1.8v-3.2c-1.4 1.2-3 1.8-4.6 1.8-3 0-5.4-2-5.4-4.1s2.4-4.1 5.4-4.1c1.6 0 3.2.6 4.6 1.8v-3.2z" fill="#fff"/>
        </svg>
      ),
    },
    {
      title: "C++",
      subtitle: "The language behind games & engines",
      href: "/learn/cpp",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <circle cx="16" cy="16" r="14" fill="#00599C"/>
          <path d="M17 10c-1.2-.9-2.7-1.4-4.4-1.4-3.8 0-6.8 2.6-6.8 5.8s3 5.8 6.8 5.8c1.7 0 3.2-.5 4.4-1.4v-2.5c-1.1 1-2.4 1.4-3.7 1.4-2.4 0-4.3-1.6-4.3-3.3s1.9-3.3 4.3-3.3c1.3 0 2.6.4 3.7 1.4V10z" fill="#fff"/>
          <path d="M20 13h1.5v-1.5h1V13H24v1h-1.5v1.5h-1V14H20v-1zM25 13h1.5v-1.5h1V13H29v1h-1.5v1.5h-1V14H25v-1z" fill="#fff"/>
        </svg>
      ),
    },
    {
      title: "C#",
      subtitle: "Build apps, games and web services",
      href: "/learn/csharp",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <path d="M16 3l12 7v12l-12 7-12-7V10l12-7z" fill="#9B4F96"/>
          <path d="M18 10.5c-1.1-.9-2.5-1.4-4-1.4-3.5 0-6.3 2.5-6.3 5.5s2.8 5.5 6.3 5.5c1.5 0 2.9-.5 4-1.4v-2.4c-1 .9-2.2 1.4-3.4 1.4-2.2 0-4-1.5-4-3.1s1.8-3.1 4-3.1c1.2 0 2.4.5 3.4 1.4v-2.4z" fill="#fff"/>
          <path d="M20.5 13.5h1.2v-1.2h.9v1.2h1.2v.8h-1.2v1.2h-.9v-1.2h-1.2v-.8zM24 13.5h1.2v-1.2h.9v1.2h1.2v.8h-1.2v1.2h-.9v-1.2H24v-.8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      title: "PHP",
      subtitle: "Server-side scripting language",
      href: "/learn/php",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <ellipse cx="16" cy="16" rx="14" ry="10" fill="#777BB4"/>
          <path d="M10 12.5h3c1.5 0 2.5.8 2.5 2s-1 2-2.5 2h-1.5v2.5H10v-6.5zm1.5 1.2v1.6h1.5c.8 0 1.2-.3 1.2-.8s-.4-.8-1.2-.8h-1.5z" fill="#fff"/>
          <path d="M18 12.5h1.5v2.5h2v-2.5H23v6.5h-1.5v-2.8h-2v2.8H18v-6.5z" fill="#fff"/>
        </svg>
      ),
    },
    {
      title: "React",
      subtitle: "Build interactive user interfaces",
      href: "/learn/react",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.8"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(60 16 16)"/>
          <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.8" transform="rotate(120 16 16)"/>
        </svg>
      ),
    },
    {
      title: "MySQL",
      subtitle: "Store and manage relational data",
      href: "/learn/mysql",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <path d="M5 24c4-3 7-8 10-10 2-1 4-1 6 0 3 2 4 5 7 7-3 2-7 2-11 1-4-1-8 0-12 2z" fill="#00758F"/>
          <path d="M16 14c-1-3 1-6 4-7 1 2 2 4 1 6-2 1-3 1-5 1z" fill="#F29111"/>
          <ellipse cx="16" cy="18" rx="10" ry="4" stroke="#00758F" strokeWidth="2" fill="none"/>
        </svg>
      ),
    },
    {
      title: "Excel",
      subtitle: "Spreadsheets and data",
      href: "/learn/excel",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <rect width="28" height="26" x="2" y="3" rx="4" fill="#107C41"/>
          <path d="M8 8l6 7-6 7h3.5l4-5 4 5H23l-6-7 6-7h-3.5l-4 5-4-5H8z" fill="#fff"/>
        </svg>
      ),
    },
    {
      title: "DSA",
      subtitle: "Data Structures and Algorithms",
      href: "/learn/dsa",
      svgIcon: (
        <svg viewBox="0 0 32 32" width="36" height="36" fill="none">
          <circle cx="16" cy="7" r="4" fill="#0284C7"/>
          <circle cx="8" cy="23" r="4" fill="#0284C7"/>
          <circle cx="24" cy="23" r="4" fill="#0284C7"/>
          <line x1="14" y1="10" x2="10" y2="20" stroke="#0284C7" strokeWidth="2.5"/>
          <line x1="18" y1="10" x2="22" y2="20" stroke="#0284C7" strokeWidth="2.5"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="w3-all-lang-section">
      <div className="w3-all-lang-container">
        <motion.h2 
          className="w3-all-lang-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          All languages
        </motion.h2>

        <div className="w3-all-lang-grid">
          {languages.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: (idx % 4) * 0.06 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Link href={item.href} className="w3-lang-card" style={{ height: "100%" }}>
                <div className="w3-lang-card-icon">
                  {item.svgIcon}
                </div>
                <h3 className="w3-lang-card-title">{item.title}</h3>
                <p className="w3-lang-card-subtitle">{item.subtitle}</p>
              </Link>
            </motion.div>
          ))}

          {/* 15th Card: "And 40+ more" */}
          <motion.div
            role="button"
            tabIndex={0}
            onClick={() => setTutorialsModalOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setTutorialsModalOpen(true);
              }
            }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: 0.25 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w3-lang-card w3-lang-more-card"
            aria-label="Buka katalog semua 40+ tutorial"
          >
            <div className="w3-more-badge-icon">
              <span className="w3-more-symbol">W3</span>
            </div>
            <div className="w3-more-content">
              <h3 className="w3-lang-card-title">And 40+ more</h3>
              <p className="w3-lang-card-subtitle">
                W3.CSS, TypeScript, Git, Django, NumPy, jQuery, Bootstrap, R, AI, Data Science and many more
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTutorialsModalOpen(true);
                }}
                className="w3-browse-all-link"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <span>Browse all tutorials</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Tutorials Modal */}
      <TutorialsModal
        isOpen={tutorialsModalOpen}
        onClose={() => setTutorialsModalOpen(false)}
      />
    </section>
  );
}
