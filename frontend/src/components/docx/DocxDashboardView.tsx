"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Bookmark, 
  Check, 
  Copy, 
  Play, 
  ChevronDown,
  Menu,
  X
} from "lucide-react";
import { useAuthModal } from "@/context/AuthModalContext";
import { useAuth } from "@/context/AuthContext";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { DocxHtmlHomeContent } from "./DocxHtmlHomeContent";
import { DocxTechHomeContent, TechDocxType } from "./DocxTechHomeContent";
import { DocxHtmlIntroductionContent } from "./DocxHtmlIntroductionContent";
import { DocxCssIntroductionContent } from "./DocxCssIntroductionContent";
import { DocxJsIntroductionContent } from "./DocxJsIntroductionContent";
import { DocxHtmlIntroductionExercisesContent } from "./DocxHtmlIntroductionExercisesContent";
import { DocxHtmlEditorsContent } from "./DocxHtmlEditorsContent";
import { DocxChapterContent } from "./DocxChapterContent";
import { DocxChapterExerciseView } from "./DocxChapterExerciseView";
import { DocxChapterChallengeView } from "./DocxChapterChallengeView";
import { 
  HTML_SECTIONS, 
  SidebarSection, 
  ChapterItem 
} from "@/lib/w3-html-chapters-data";
import { CSS_SECTIONS } from "@/lib/w3-css-chapters-data";
import { JS_SECTIONS } from "@/lib/w3-js-chapters-data";
import { PYTHON_SECTIONS } from "@/lib/w3-python-chapters-data";
import { SQL_SECTIONS } from "@/lib/w3-sql-chapters-data";
import { getOrCreateCourseMeta, normalizeTechKey, TECH_TO_SLUG_MAP } from "@/lib/w3-all-courses-catalog";

export type SupportedTech = string;

interface DocxDashboardViewProps {
  initialTech?: SupportedTech;
  initialChapter?: string;
  initialSubChapter?: string;
}

export function DocxDashboardView({
  initialTech = "HTML",
  initialChapter = "home",
  initialSubChapter,
}: DocxDashboardViewProps) {
  const { openSignIn } = useAuthModal();
  const { user } = useAuth();
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set());

  // Tech state: defaults to HTML as requested
  const [activeTech, setActiveTech] = useState<SupportedTech>(initialTech);
  const sidebarRef = useRef<HTMLElement>(null);

  // Sync props if changed externally
  useEffect(() => {
    if (initialTech && initialTech !== activeTech) {
      setActiveTech(initialTech);
    }
  }, [initialTech]);

  useEffect(() => {
    if (initialChapter) {
      const chap = initialChapter === "exercises" ? "introduction" : initialChapter;
      setActiveChapterSlug(chap);
      setActiveSubSlug(initialSubChapter || (initialChapter === "exercises" ? "exercises" : chap));
      setExpandedChapters((prev) => ({ ...prev, [chap]: true }));
    }
  }, [initialChapter, initialSubChapter]);

  // Fetch completed chapters for current user
  useEffect(() => {
    if (!user) {
      setCompletedChapters(new Set());
      return;
    }
    fetch(`/api/progress/chapter?tech=${encodeURIComponent(activeTech)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.chapters && Array.isArray(data.chapters)) {
          setCompletedChapters(new Set(data.chapters.map((c: any) => c.chapter_slug)));
        }
      })
      .catch(() => {});
  }, [user, activeTech]);
  const [activeChapterSlug, setActiveChapterSlug] = useState<string>(
    initialChapter === "exercises" ? "introduction" : initialChapter
  );
  const [activeSubSlug, setActiveSubSlug] = useState<string>(
    initialSubChapter || (initialChapter === "exercises" ? "exercises" : initialChapter)
  );
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    if (initialChapter && initialChapter !== "home") {
      const chap = initialChapter === "exercises" ? "introduction" : initialChapter;
      return { [chap]: true };
    }
    return {};
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sub = params.get("sub");
      if (sub) {
        setActiveSubSlug(sub);
      }
    }
  }, []);

  const prevChapterRef = useRef(activeChapterSlug);
  useEffect(() => {
    if (prevChapterRef.current !== activeChapterSlug) {
      prevChapterRef.current = activeChapterSlug;
      if (activeChapterSlug && activeChapterSlug !== "home") {
        setExpandedChapters((prev) => ({ ...prev, [activeChapterSlug]: true }));
      }
    }
  }, [activeChapterSlug]);

  // Auto-scroll sidebar vertically so the active chapter or sub-item is centered and visible
  useEffect(() => {
    if (!sidebarRef.current) return;
    const timer = setTimeout(() => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const activeEl =
        sidebar.querySelector<HTMLElement>(".w3-docx-subitem.active") ||
        sidebar.querySelector<HTMLElement>(".w3-docx-chapter-item.active") ||
        sidebar.querySelector<HTMLElement>(".w3-docx-chapter-parent-row.selected");

      if (activeEl) {
        const sidebarRect = sidebar.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const relativeTop = activeRect.top - sidebarRect.top + sidebar.scrollTop;
        const targetScrollTop = Math.max(
          0,
          relativeTop - sidebar.clientHeight / 2 + activeRect.height / 2
        );
        sidebar.scrollTo({ top: targetScrollTop, behavior: "smooth" });
      }
    }, 140);

    return () => clearTimeout(timer);
  }, [activeChapterSlug, activeSubSlug, activeTech, mobileSidebarOpen, expandedChapters]);

  // Content interactive state (Home)
  const [copiedShare, setCopiedShare] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Exercise state (Home)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);

  const getSections = (): SidebarSection[] => {
    const normalized = normalizeTechKey(activeTech);
    switch (normalized) {
      case "CSS": return CSS_SECTIONS;
      case "JAVASCRIPT": return JS_SECTIONS;
      case "PYTHON": return PYTHON_SECTIONS;
      case "SQL": return SQL_SECTIONS;
      case "HTML": return HTML_SECTIONS;
      default: return getOrCreateCourseMeta(normalized).sections;
    }
  };

  const sections = getSections();

  const handleSelectChapter = (chapterSlug: string, subSlug?: string) => {
    setActiveChapterSlug(chapterSlug);
    const resolvedSub = subSlug || chapterSlug;
    setActiveSubSlug(resolvedSub);

    setExpandedChapters((prev) => ({ ...prev, [chapterSlug]: true }));

    // Sync browser URL without reloading
    if (typeof window !== "undefined") {
      const norm = normalizeTechKey(activeTech);
      const techSlug = TECH_TO_SLUG_MAP[norm] || activeTech.toLowerCase();
      const url =
        chapterSlug === "home"
          ? `/learn/${techSlug}`
          : resolvedSub && resolvedSub !== chapterSlug
          ? `/learn/${techSlug}/${chapterSlug}?sub=${resolvedSub}`
          : `/learn/${techSlug}/${chapterSlug}`;
      window.history.pushState(null, "", url);
    }

    if (user && chapterSlug && chapterSlug !== "home") {
      fetch("/api/progress/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tech: activeTech, chapterSlug }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then(() => {
          setCompletedChapters((prev) => new Set([...prev, chapterSlug]));
        })
        .catch(() => {});
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileSidebarOpen(false);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleExerciseSubmit = () => {
    if (!selectedAnswer) return;
    setExerciseSubmitted(true);
  };

  return (
    <div className="w3-docx-root">
      {/* 1. Header with full navigation and subnav ticker */}
      <LandingHeader 
        activeTech={activeTech} 
        onSelectTech={(tech) => {
          setActiveTech(tech as SupportedTech);
          setActiveChapterSlug("home");
          setActiveSubSlug("introduction");
          setSelectedAnswer(null);
          setExerciseSubmitted(false);
          if (typeof window !== "undefined") {
            const norm = normalizeTechKey(tech);
            const techSlug = TECH_TO_SLUG_MAP[norm] || tech.toLowerCase();
            window.history.pushState(null, "", `/learn/${techSlug}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      />

      {/* 2. Responsive Mobile Bar for Chapter Selection */}
      <div className="w3-docx-mobile-bar">
        <button
          type="button"
          className="w3-docx-sidebar-toggle"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label="Toggle Chapter List"
        >
          {mobileSidebarOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          <span>{mobileSidebarOpen ? "Close Modules Menu" : `${activeTech} Modules Menu`}</span>
        </button>
      </div>

      {/* 3. Documentation Layout */}
      <div className="w3-docx-layout">
        {/* LEFT COLUMN: CHAPTER SIDEBAR */}
        <aside className={`w3-docx-sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`} ref={sidebarRef}>
          <nav className="w3-docx-chapter-nav" aria-label={`${activeTech} Modules List`}>
            {sections.map((section) => (
              <div key={section.title} className="w3-docx-sidebar-group">
                <div className="w3-docx-sidebar-section-title">
                  {section.title}
                </div>

                {section.items.map((chapter) => {
                  const isSelectedChapter = chapter.slug === activeChapterSlug;
                  const isExpanded = !!expandedChapters[chapter.slug];

                  if (chapter.subItems && chapter.subItems.length > 0) {
                    return (
                      <div key={chapter.name} className="w3-docx-chapter-group">
                        <div className={`w3-docx-chapter-parent-row ${isSelectedChapter ? "selected" : ""}`}>
                          <button
                            type="button"
                            className="w3-docx-chapter-title-btn"
                            onClick={() => {
                              if (isExpanded) {
                                // If currently open, collapse it!
                                setExpandedChapters((prev) => ({
                                  ...prev,
                                  [chapter.slug]: false,
                                }));
                              } else {
                                // If currently closed, open it and select its first sub-item
                                handleSelectChapter(chapter.slug, chapter.subItems![0].slug);
                              }
                            }}
                          >
                            <span>{chapter.name}</span>
                          </button>
                          <button
                            type="button"
                            className="w3-docx-chapter-caret-btn"
                            aria-label={isExpanded ? `Collapse ${chapter.name} sub-menu` : `Expand ${chapter.name} sub-menu`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedChapters((prev) => ({
                                ...prev,
                                [chapter.slug]: !prev[chapter.slug],
                              }));
                            }}
                          >
                            <ChevronDown
                              className={`w3-docx-chapter-caret ${isExpanded ? "rotated" : ""}`}
                              aria-hidden="true"
                            />
                          </button>
                        </div>

                        <div className={`w3-docx-subnav-wrapper ${isExpanded ? "expanded" : ""}`}>
                          <div className="w3-docx-subnav-inner">
                            <div className="w3-docx-subnav">
                              {chapter.subItems.map((sub) => {
                                const isSubActive = isSelectedChapter && activeSubSlug === sub.slug;
                                return (
                                  <button
                                    key={sub.name}
                                    type="button"
                                    className={`w3-docx-subitem ${isSubActive ? "active" : ""}`}
                                    onClick={() => {
                                      handleSelectChapter(chapter.slug, sub.slug);
                                    }}
                                  >
                                    <span>{sub.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isActive = chapter.slug === activeChapterSlug;
                  const isCompleted = completedChapters.has(chapter.slug);
                  return (
                    <button
                      key={chapter.name}
                      type="button"
                      className={`w3-docx-chapter-item ${isActive ? "active" : ""}`}
                      onClick={() => handleSelectChapter(chapter.slug)}
                    >
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                        <span>{chapter.name}</span>
                        {isCompleted && (
                          <Check style={{ width: 13, height: 13, color: "#10b981", flexShrink: 0, marginLeft: 4 }} />
                        )}
                      </span>
                      {chapter.hasCaret && (
                        <ChevronDown className="w3-docx-chapter-caret" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* CENTER COLUMN: MAIN TUTORIAL DOCUMENTATION */}
        {activeChapterSlug === "home" ? (
          activeTech === "HTML" ? (
            <DocxHtmlHomeContent
              onGoNext={() => handleSelectChapter("introduction", "introduction")}
              onSelectChapter={(slug) => handleSelectChapter(slug)}
            />
          ) : (
            <DocxTechHomeContent
              tech={activeTech as TechDocxType}
              onGoNext={() => handleSelectChapter("introduction", "introduction")}
              onSelectChapter={(slug) => handleSelectChapter(slug)}
            />
          )
        ) : activeSubSlug === "exercises" || activeSubSlug === "challenge" ? (
          <DocxChapterExerciseView
            tech={activeTech}
            chapterKey={activeChapterSlug}
            onNavigate={handleSelectChapter}
          />
        ) : activeChapterSlug === "introduction" ? (
          activeTech === "HTML" ? (
            <DocxHtmlIntroductionContent
              onGoHome={() => handleSelectChapter("home")}
              onGoNext={() => handleSelectChapter("introduction", "exercises")}
            />
          ) : activeTech === "CSS" ? (
            <DocxCssIntroductionContent
              onGoHome={() => handleSelectChapter("home")}
              onGoNext={() => handleSelectChapter("introduction", "exercises")}
            />
          ) : activeTech === "JAVASCRIPT" ? (
            <DocxJsIntroductionContent
              onGoHome={() => handleSelectChapter("home")}
              onGoNext={() => handleSelectChapter("introduction", "exercises")}
            />
          ) : (
            <DocxChapterContent
              tech={activeTech}
              chapterKey={activeChapterSlug}
              onNavigate={handleSelectChapter}
            />
          )
        ) : activeChapterSlug === "editors" && activeTech === "HTML" ? (
          <DocxHtmlEditorsContent
            onGoPrevious={() => handleSelectChapter("introduction", "exercises")}
            onGoNext={() => handleSelectChapter("basic")}
          />
        ) : (
          <DocxChapterContent
            tech={activeTech}
            chapterKey={activeChapterSlug}
            onNavigate={handleSelectChapter}
          />
        )}
      </div>
    </div>
  );
}
