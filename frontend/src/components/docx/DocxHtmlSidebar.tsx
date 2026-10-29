"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { HTML_SECTIONS, SidebarSection } from "@/lib/w3-html-chapters-data";
import { CSS_SECTIONS } from "@/lib/w3-css-chapters-data";
import { JS_SECTIONS } from "@/lib/w3-js-chapters-data";
import { PYTHON_SECTIONS } from "@/lib/w3-python-chapters-data";
import { SQL_SECTIONS } from "@/lib/w3-sql-chapters-data";
import { getOrCreateCourseMeta, normalizeTechKey, getSlugForTech } from "@/lib/w3-all-courses-catalog";

export type DocxTech = string;

interface DocxSidebarProps {
  currentTech: DocxTech;
  onTechChange: (tech: DocxTech) => void;
  currentSlug?: string;
}

export function DocxHtmlSidebar({ currentTech, currentSlug = "home" }: DocxSidebarProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const normalized = normalizeTechKey(currentTech);
  const techSlug = getSlugForTech(normalized);

  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>(() => {
    if (currentSlug && currentSlug !== "home") {
      return { [currentSlug]: true };
    }
    return {};
  });

  const prevSlugRef = useRef(currentSlug);
  useEffect(() => {
    if (prevSlugRef.current !== currentSlug) {
      prevSlugRef.current = currentSlug;
      if (currentSlug && currentSlug !== "home") {
        setExpandedChapters({ [currentSlug]: true });
      }
    }
  }, [currentSlug]);

  const getSections = (): SidebarSection[] => {
    switch (normalized) {
      case "CSS":
        return CSS_SECTIONS;
      case "JAVASCRIPT":
        return JS_SECTIONS;
      case "PYTHON":
        return PYTHON_SECTIONS;
      case "SQL":
        return SQL_SECTIONS;
      case "HTML":
        return HTML_SECTIONS;
      default:
        return getOrCreateCourseMeta(normalized).sections;
    }
  };

  const sections = getSections();

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="w3-docx-mobile-bar">
        <button
          type="button"
          className="w3-docx-sidebar-toggle"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          aria-label={mobileSidebarOpen ? "Close module menu" : "Open module menu"}
        >
          {mobileSidebarOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
          <span>{mobileSidebarOpen ? "Close Module Menu" : `${normalized} Module Menu`}</span>
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`w3-docx-sidebar ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <nav className="w3-docx-chapter-nav" aria-label={`${normalized} Chapter Navigation`}>
          {sections.map((section) => (
            <div key={section.title} className="w3-docx-sidebar-group">
              <div className="w3-docx-sidebar-section-title">
                {section.title}
              </div>

              {section.items
                .filter((ch) => !ch.slug.toLowerCase().includes("quiz") && !ch.name.toLowerCase().includes("quiz"))
                .map((chapter) => {
                const isActive = chapter.slug === currentSlug;
                const isExpanded = !!expandedChapters[chapter.slug];

                if (chapter.subItems && chapter.subItems.length > 0) {
                  return (
                    <div key={chapter.name} className="w3-docx-chapter-group">
                      <div className={`w3-docx-chapter-parent-row ${isActive ? "selected" : ""}`}>
                        <Link
                          href={`/learn/${techSlug}/${chapter.slug}`}
                          className="w3-docx-chapter-title-btn"
                          onClick={(e) => {
                            if (isActive && isExpanded) {
                              e.preventDefault();
                              setExpandedChapters((prev) => ({
                                ...prev,
                                [chapter.slug]: false,
                              }));
                              return;
                            }
                            setMobileSidebarOpen(false);
                            setExpandedChapters({ [chapter.slug]: true });
                          }}
                        >
                          <span>{chapter.name}</span>
                        </Link>
                        <button
                          type="button"
                          className="w3-docx-chapter-caret-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpandedChapters((prev) => ({
                              ...prev,
                              [chapter.slug]: !prev[chapter.slug],
                            }));
                          }}
                          aria-label={isExpanded ? `Collapse ${chapter.name} submenu` : `Expand ${chapter.name} submenu`}
                        >
                          <ChevronDown className={`w3-docx-chapter-caret ${isExpanded ? "rotated" : ""}`} aria-hidden="true" />
                        </button>
                      </div>
                      <div className={`w3-docx-subnav-wrapper ${isExpanded ? "expanded" : ""}`}>
                        <div className="w3-docx-subnav-inner">
                          <div className="w3-docx-subnav">
                            {chapter.subItems.map((sub, sIdx) => {
                              const isSubActive = sIdx === 0 && isActive;
                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.slug === chapter.slug ? `/learn/${techSlug}/${chapter.slug}` : `/learn/${techSlug}/${chapter.slug}?sub=${sub.slug}`}
                                  className={`w3-docx-subitem ${isSubActive ? "active" : ""}`}
                                  onClick={() => setMobileSidebarOpen(false)}
                                >
                                  <span>{sub.name}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={chapter.name}
                    href={chapter.slug === "home" ? (normalized === "HTML" ? "/dashboard" : `/learn/${techSlug}`) : `/learn/${techSlug}/${chapter.slug}`}
                    className={`w3-docx-chapter-item ${isActive ? "active" : ""}`}
                    onClick={() => setMobileSidebarOpen(false)}
                  >
                    <span>{chapter.name}</span>
                    {chapter.hasCaret && (
                      <ChevronDown className="w3-docx-chapter-caret" aria-hidden="true" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
