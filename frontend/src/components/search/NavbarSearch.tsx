"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowRight, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  getLocalSearchHistory,
  saveLocalSearchHistory,
} from "@/lib/user-progress-store";
import { SLUG_TO_TECH_MAP, TECH_TO_SLUG_MAP } from "@/lib/w3-all-courses-catalog";
import { ALL_HTML_CHAPTERS } from "@/lib/w3-html-chapters-data";
import { ALL_CSS_CHAPTERS } from "@/lib/w3-css-chapters-data";
import { ALL_JS_CHAPTERS } from "@/lib/w3-js-chapters-data";
import { ALL_PYTHON_CHAPTERS } from "@/lib/w3-python-chapters-data";
import { ALL_SQL_CHAPTERS } from "@/lib/w3-sql-chapters-data";

export interface SearchResultItem {
  id: string;
  title: string;
  category: "course" | "chapter" | "tool";
  tech?: string;
  url: string;
  badge: string;
  keywords?: string[];
}

const GUEST_STORAGE_KEY = "devacademy_guest_search_history";

const TRENDING_SEARCHES = [
  { text: "HTML5 Dasar & Elemen Semantik", url: "/learn/html" },
  { text: "CSS Flexbox & Responsive Layout", url: "/learn/css" },
  { text: "JavaScript Fetch API & Async", url: "/learn/javascript" },
  { text: "Python Pemula & Data Science", url: "/learn/python" },
  { text: "SQL Database JOIN Query", url: "/learn/sql" },
];

/* Google Material History Icon (counter-clockwise clock) */
function GoogleHistoryIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      style={{ flexShrink: 0, color: "#5f6368", ...style }}
      aria-hidden="true"
    >
      <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
    </svg>
  );
}

/* Google Trending Up Icon */
function GoogleTrendingIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      style={{ flexShrink: 0, color: "#5f6368", ...style }}
      aria-hidden="true"
    >
      <path d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
    </svg>
  );
}

export function NavbarSearch() {
  const router = useRouter();
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync search history based on logged-in user account or guest localStorage
  const loadSearchHistory = useCallback(async () => {
    if (user) {
      const localHist = getLocalSearchHistory(user.email);
      if (localHist.length > 0) {
        setHistory(localHist);
      }
      try {
        const res = await fetch("/api/search/history");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.history)) {
            const combined = Array.from(new Set([...localHist, ...data.history])).slice(0, 15);
            setHistory(combined);
            if (combined.length !== localHist.length) {
              saveLocalSearchHistory(user.email, combined, user);
            }
            return;
          }
        }
      } catch (err) {
        console.error("Failed to load user search history:", err);
      }
    } else {
      // Guest mode: only load searches actually performed on this browser
      try {
        const saved = localStorage.getItem(GUEST_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setHistory(parsed.filter((item): item is string => typeof item === "string" && item.trim().length > 0));
            return;
          }
        }
      } catch {}
      setHistory([]);
    }
  }, [user]);

  useEffect(() => {
    loadSearchHistory();
    window.addEventListener("devacademy-cloud-synced", loadSearchHistory);
    return () => window.removeEventListener("devacademy-cloud-synced", loadSearchHistory);
  }, [loadSearchHistory]);

  const saveToHistory = async (item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;

    // Optimistically update local state
    const nextList = [trimmed, ...history.filter((q) => q.toLowerCase() !== trimmed.toLowerCase())].slice(0, 15);
    setHistory(nextList);

    if (user) {
      saveLocalSearchHistory(user.email, nextList, user);
      try {
        await fetch("/api/search/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: trimmed }),
        });
      } catch (err) {
        console.error("Failed to save search history to user account:", err);
      }
    } else {
      try {
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(nextList));
      } catch {}
    }
  };

  const removeFromHistory = async (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    const nextList = history.filter((q) => q !== item);
    setHistory(nextList);

    if (user) {
      saveLocalSearchHistory(user.email, nextList, user);
      try {
        await fetch(`/api/search/history?query=${encodeURIComponent(item)}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to delete search history item from user account:", err);
      }
    } else {
      try {
        localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(nextList));
      } catch {}
    }
  };

  const clearAllHistory = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setHistory([]);

    if (user) {
      saveLocalSearchHistory(user.email, [], user);
      try {
        await fetch("/api/search/history?all=true", {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to clear search history for user account:", err);
      }
    } else {
      try {
        localStorage.removeItem(GUEST_STORAGE_KEY);
      } catch {}
    }
  };

  // Build searchable catalog once
  const searchIndex = useMemo<SearchResultItem[]>(() => {
    const list: SearchResultItem[] = [];

    // 1. Tool items
    list.push({
      id: "tool-exercises",
      title: "Coding Exercises & Latihan Soal Lengkap",
      category: "tool",
      badge: "EXERCISE",
      url: "/exercises",
      keywords: ["exercise", "exercises", "latihan", "soal", "kuis", "quiz", "coding exercise"],
    });
    list.push({
      id: "tool-editor",
      title: "Tryit Code Editor (HTML, CSS, JS, Python, SQL)",
      category: "tool",
      badge: "EDITOR",
      url: "/tryit?empty=true",
      keywords: ["code", "editor", "compiler", "run", "tryit", "playground", "coding"],
    });
    list.push({
      id: "tool-dashboard",
      title: "Daftar Semua Materi & Kursus (Dashboard)",
      category: "tool",
      badge: "MATERI",
      url: "/dashboard",
      keywords: ["dashboard", "semua materi", "kursus", "tutorial", "index"],
    });

    // 2. Main course subjects
    Object.entries(TECH_TO_SLUG_MAP).forEach(([tech, slug]) => {
      list.push({
        id: `course-${slug}`,
        title: `${tech} Tutorial`,
        category: "course",
        tech,
        badge: tech,
        url: `/learn/${slug}`,
        keywords: [tech.toLowerCase(), slug, "belajar", "kursus", "dasar", "pemrograman"],
      });
      list.push({
        id: `exercise-${slug}`,
        title: `${tech} Exercises & Soal Latihan`,
        category: "tool",
        tech,
        badge: "EXERCISE",
        url: `/exercises/${slug}`,
        keywords: [tech.toLowerCase(), slug, "exercise", "soal", "latihan", "kuis"],
      });
    });

    // 3. Chapters from HTML
    ALL_HTML_CHAPTERS.forEach((ch) => {
      const title = ch.name.toUpperCase().startsWith("HTML") ? ch.name : `HTML ${ch.name}`;
      list.push({
        id: `html-${ch.slug}`,
        title,
        category: "chapter",
        tech: "HTML",
        badge: "HTML",
        url: `/learn/html/${ch.slug}`,
        keywords: ["html", ch.slug, ch.name.toLowerCase(), "web", "frontend", "markup"],
      });
    });

    // 4. Chapters from CSS
    ALL_CSS_CHAPTERS.forEach((ch) => {
      const title = ch.name.toUpperCase().startsWith("CSS") ? ch.name : `CSS ${ch.name}`;
      list.push({
        id: `css-${ch.slug}`,
        title,
        category: "chapter",
        tech: "CSS",
        badge: "CSS",
        url: `/learn/css/${ch.slug}`,
        keywords: ["css", ch.slug, ch.name.toLowerCase(), "styling", "style", "design", "layout"],
      });
    });

    // 5. Chapters from JS
    ALL_JS_CHAPTERS.forEach((ch) => {
      const upper = ch.name.toUpperCase();
      const title = upper.startsWith("JAVASCRIPT") || upper.startsWith("JS") ? ch.name : `JavaScript ${ch.name}`;
      list.push({
        id: `js-${ch.slug}`,
        title,
        category: "chapter",
        tech: "JAVASCRIPT",
        badge: "JS",
        url: `/learn/javascript/${ch.slug}`,
        keywords: ["javascript", "js", ch.slug, ch.name.toLowerCase(), "logic", "script"],
      });
    });

    // 6. Chapters from Python
    ALL_PYTHON_CHAPTERS.forEach((ch) => {
      const title = ch.name.toUpperCase().startsWith("PYTHON") ? ch.name : `Python ${ch.name}`;
      list.push({
        id: `py-${ch.slug}`,
        title,
        category: "chapter",
        tech: "PYTHON",
        badge: "PYTHON",
        url: `/learn/python/${ch.slug}`,
        keywords: ["python", "py", ch.slug, ch.name.toLowerCase(), "backend", "ai", "data"],
      });
    });

    // 7. Chapters from SQL
    ALL_SQL_CHAPTERS.forEach((ch) => {
      const title = ch.name.toUpperCase().startsWith("SQL") ? ch.name : `SQL ${ch.name}`;
      list.push({
        id: `sql-${ch.slug}`,
        title,
        category: "chapter",
        tech: "SQL",
        badge: "SQL",
        url: `/learn/sql/${ch.slug}`,
        keywords: ["sql", "database", "query", ch.slug, ch.name.toLowerCase(), "table", "select"],
      });
    });

    return list;
  }, []);

  // Filter results based on search query
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const words = q.split(/\s+/).filter(Boolean);

    return searchIndex
      .filter((item) => {
        const titleMatch = words.every((w) => item.title.toLowerCase().includes(w));
        if (titleMatch) return true;

        const techMatch = item.tech?.toLowerCase().includes(q);
        if (techMatch) return true;

        const keywordMatch = item.keywords?.some((k) => words.every((w) => k.includes(w)));
        return keywordMatch;
      })
      .slice(0, 30);
  }, [query, searchIndex]);

  // Global shortcut (Ctrl + K or /) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation inside dropdown
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (query.trim().length > 0) {
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      } else if (history.length > 0) {
        setSelectedIndex((prev) => (prev < history.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (query.trim().length > 0) {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      } else if (history.length > 0) {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : history.length - 1));
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim().length > 0) {
        if (filteredResults[selectedIndex]) {
          const item = filteredResults[selectedIndex];
          saveToHistory(query.trim() || item.title);
          router.push(item.url);
          setIsOpen(false);
        } else {
          // If no specific item selected, save query and go to dashboard search
          saveToHistory(query.trim());
          router.push(`/dashboard?q=${encodeURIComponent(query.trim())}`);
          setIsOpen(false);
        }
      } else if (history.length > 0 && history[selectedIndex]) {
        const selectedQuery = history[selectedIndex];
        setQuery(selectedQuery);
        saveToHistory(selectedQuery);
        const match = searchIndex.find(
          (item) => item.title.toLowerCase().includes(selectedQuery.toLowerCase())
        );
        if (match) {
          router.push(match.url);
        } else {
          router.push(`/dashboard?q=${encodeURIComponent(selectedQuery)}`);
        }
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectResult = (item: SearchResultItem) => {
    saveToHistory(query.trim() || item.title);
    router.push(item.url);
    setIsOpen(false);
  };

  return (
    <>
      <style>{`
        .google-search-row:hover {
          background-color: #f1f3f4 !important;
        }
        .google-search-row:hover .google-search-delete-btn {
          opacity: 1 !important;
          visibility: visible !important;
        }
        .google-search-delete-btn {
          opacity: 0;
          visibility: hidden;
        }
        .google-search-delete-btn:hover {
          color: #d93025 !important;
          background-color: #e8eaed !important;
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          flex: "1 1 320px",
          maxWidth: 480,
          margin: "0 12px",
        }}
      >
        {/* Search Bar Input */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: 42,
            backgroundColor: "#ffffff",
            borderRadius: isOpen ? "22px 22px 0 0" : 22,
            border: "1px solid #dfe1e5",
            borderBottom: isOpen ? "1px solid #f1f3f4" : undefined,
            boxShadow: isOpen
              ? "0 4px 18px rgba(0, 0, 0, 0.12)"
              : "0 1px 6px rgba(32, 33, 36, 0.08)",
            padding: "0 12px 0 16px",
            transition: "border-radius 0.15s ease, box-shadow 0.15s ease",
            zIndex: 99999,
          }}
        >
          {/* Left Search Icon */}
          <Search
            style={{
              width: 17,
              height: 17,
              color: "#5f6368",
              marginRight: 10,
              flexShrink: 0,
            }}
            aria-hidden="true"
          />

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search tutorials, courses, tags..."
            aria-label="Cari tutorial atau materi coding"
            style={{
              flex: 1,
              height: "100%",
              border: "none",
              outline: "none",
              background: "transparent",
              color: "#1f1f1f",
              fontSize: 14.5,
              fontWeight: 400,
              fontFamily: "inherit",
              minWidth: 0,
              padding: 0,
            }}
          />

          {/* Right Action: Clear Button (X) */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              style={{
                background: "none",
                border: "none",
                padding: 4,
                cursor: "pointer",
                color: "#5f6368",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 6,
              }}
              title="Bersihkan pencarian"
            >
              <X style={{ width: 16, height: 16 }} />
            </button>
          )}
        </div>

        {/* Dropdown Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="listbox"
              initial={{ opacity: 0, y: -6, scaleY: 0.98 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -4, scaleY: 0.98 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#ffffff",
                borderRadius: "0 0 22px 22px",
                border: "1px solid #dfe1e5",
                borderTop: "none",
                boxShadow: "0 16px 28px rgba(0, 0, 0, 0.16)",
                maxHeight: "75vh",
                overflowY: "auto",
                zIndex: 99999,
                padding: "4px 0 10px",
                transformOrigin: "top center",
              }}
            >
            {query.trim().length > 0 ? (
              /* Search Results State */
              filteredResults.length > 0 ? (
                <div>
                  <div
                    style={{
                      padding: "8px 18px 4px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#5f6368",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Hasil Pencarian ({filteredResults.length})
                  </div>

                  {filteredResults.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelectResult(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className="google-search-row"
                        style={{
                          padding: "9px 18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          backgroundColor: isSelected ? "#f1f3f4" : "transparent",
                          transition: "background 0.1s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                          <span
                            style={{
                              fontSize: 10.5,
                              fontWeight: 800,
                              padding: "2px 6px",
                              borderRadius: 4,
                              backgroundColor:
                                item.category === "tool"
                                  ? "#e0f2fe"
                                  : item.badge === "HTML"
                                  ? "#ffedd5"
                                  : item.badge === "CSS"
                                  ? "#e0e7ff"
                                  : item.badge === "PYTHON"
                                  ? "#dcfce7"
                                  : item.badge === "SQL"
                                  ? "#f3e8ff"
                                  : "#f1f5f9",
                              color:
                                item.category === "tool"
                                  ? "#0284c7"
                                  : item.badge === "HTML"
                                  ? "#c2410c"
                                  : item.badge === "CSS"
                                  ? "#4338ca"
                                  : item.badge === "PYTHON"
                                  ? "#15803d"
                                  : item.badge === "SQL"
                                  ? "#7e22ce"
                                  : "#475569",
                              flexShrink: 0,
                            }}
                          >
                            {item.badge}
                          </span>

                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: isSelected ? 600 : 400,
                              color: "#202124",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.title}
                          </span>
                        </div>

                        <ArrowRight
                          style={{
                            width: 14,
                            height: 14,
                            color: isSelected ? "#1f1f1f" : "#9aa0a6",
                            flexShrink: 0,
                            transform: isSelected ? "translateX(2px)" : "none",
                            transition: "all 0.15s ease",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ padding: "24px 18px", textAlign: "center", color: "#5f6368" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 550, color: "#202124" }}>
                    Materi &quot;{query}&quot; tidak ditemukan
                  </p>
                  <p style={{ margin: 0, fontSize: 12.5, color: "#5f6368" }}>
                    Coba kata kunci lain atau pilih topik penelusuran trending di bawah.
                  </p>
                </div>
              )
            ) : (
              /* History & Trending State */
              <div>
                {/* Search History Rows */}
                {history.length > 0 && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 18px 4px",
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: "#5f6368",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <span>Riwayat Pencarian {user ? `(${user.name})` : ""}</span>
                      <button
                        type="button"
                        onClick={clearAllHistory}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ef4444",
                          fontSize: 11,
                          fontWeight: 650,
                          cursor: "pointer",
                          padding: "2px 6px",
                          borderRadius: 4,
                        }}
                      >
                        Hapus Semua
                      </button>
                    </div>

                    {history.map((histText, idx) => (
                      <div
                        key={`${histText}-${idx}`}
                        className="google-search-row"
                        onClick={() => {
                          setQuery(histText);
                          saveToHistory(histText);
                          const directMatch = searchIndex.find(
                            (item) =>
                              item.title.toLowerCase().includes(histText.toLowerCase()) ||
                              item.keywords?.some((k) => k.includes(histText.toLowerCase()))
                          );
                          if (directMatch) {
                            router.push(directMatch.url);
                          } else {
                            router.push(`/dashboard?q=${encodeURIComponent(histText)}`);
                          }
                          setIsOpen(false);
                        }}
                        style={{
                          padding: "8px 18px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          fontSize: 14,
                          color: "#202124",
                          userSelect: "none",
                          transition: "background-color 0.1s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                          <GoogleHistoryIcon />
                          <span
                            style={{
                              fontWeight: 400,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {histText}
                          </span>
                        </div>

                        {/* Delete Button (X) */}
                        <button
                          type="button"
                          onClick={(e) => removeFromHistory(e, histText)}
                          className="google-search-delete-btn"
                          style={{
                            background: "none",
                            border: "none",
                            padding: "4px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            color: "#70757a",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.15s ease",
                            marginLeft: 8,
                          }}
                          title="Hapus dari riwayat"
                        >
                          <X style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Penelusuran Trending */}
                <div>
                  <div
                    style={{
                      padding: history.length > 0 ? "12px 18px 4px" : "8px 18px 4px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#5f6368",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      borderTop: history.length > 0 ? "1px solid #f1f3f4" : "none",
                    }}
                  >
                    Topik Populer
                  </div>

                  {TRENDING_SEARCHES.map((item) => (
                    <div
                      key={item.text}
                      className="google-search-row"
                      onClick={() => {
                        saveToHistory(item.text);
                        router.push(item.url);
                        setIsOpen(false);
                      }}
                      style={{
                        padding: "8px 18px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        cursor: "pointer",
                        fontSize: 14,
                        color: "#202124",
                        userSelect: "none",
                        transition: "background-color 0.1s ease",
                      }}
                    >
                      <GoogleTrendingIcon />
                      <span style={{ fontWeight: 400 }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
