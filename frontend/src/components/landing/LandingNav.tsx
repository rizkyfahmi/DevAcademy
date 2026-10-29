"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowRight, 
  BookOpen, 
  Bot, 
  Code2, 
  LayoutDashboard, 
  Menu, 
  NotebookPen, 
  Search, 
  Sparkles, 
  TerminalSquare, 
  X 
} from "lucide-react";
import { DevAcademyLogo } from "@/components/brand/DevAcademyLogo";

export function LandingNav() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <header className="landing-nav-wrapper">
      <div className="landing-nav-container">
        {/* Brand */}
        <Link href="/" className="landing-brand">
          <DevAcademyLogo size={32} variant="badge" />
          <span className="landing-brand-text">
            DevAcademy
            <span className="landing-brand-pill">ID</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="landing-nav-links" aria-label="Landing Navigation">
          <Link href="/dashboard" className="landing-nav-link">
            <BookOpen className="landing-nav-icon" />
            Courses
          </Link>
          <Link href="/exercises" className="landing-nav-link">
            <NotebookPen className="landing-nav-icon" />
            Exercises
          </Link>
          <Link href="/playground" className="landing-nav-link">
            <Code2 className="landing-nav-icon" />
            Playground
          </Link>

          <Link href="/ai-tutor" className="landing-nav-link">
            <Bot className="landing-nav-icon" />
            AI Tutor
          </Link>
        </nav>

        {/* Search Bar & CTAs */}
        <div className="landing-nav-actions">
          <form onSubmit={handleSearch} className="landing-nav-search">
            <Search className="landing-search-icon" aria-hidden="true" />
            <input 
              type="text" 
              placeholder="Search tutorials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="landing-search-input"
            />
          </form>

          <Link href="/dashboard" className="secondary-button landing-dash-btn">
            <LayoutDashboard aria-hidden="true" />
            <span>Dashboard</span>
          </Link>

          <Link href="/learn/html/introduction" className="primary-button landing-start-btn">
            <span>Start Learning</span>
            <ArrowRight aria-hidden="true" />
          </Link>

          {/* Mobile hamburger */}
          <button 
            type="button" 
            className="landing-mobile-toggle"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="landing-mobile-menu">
          <form onSubmit={handleSearch} className="landing-mobile-search">
            <Search className="landing-search-icon" aria-hidden="true" />
            <input 
              type="text" 
              placeholder="Search HTML, CSS, JS tutorials..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="landing-search-input"
            />
          </form>
          <div className="landing-mobile-links">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="landing-mobile-link">
              <BookOpen />
              <span>All Courses & Tutorials</span>
            </Link>
            <Link href="/exercises" onClick={() => setMobileOpen(false)} className="landing-mobile-link">
              <NotebookPen />
              <span>Coding Exercises</span>
            </Link>
            <Link href="/playground" onClick={() => setMobileOpen(false)} className="landing-mobile-link">
              <Code2 />
              <span>Interactive Playground</span>
            </Link>

            <Link href="/ai-tutor" onClick={() => setMobileOpen(false)} className="landing-mobile-link">
              <Bot />
              <span>Ask AI Tutor</span>
            </Link>
            <Link href="/glossary" onClick={() => setMobileOpen(false)} className="landing-mobile-link">
              <BookOpen />
              <span>Tech Glossary</span>
            </Link>
          </div>
          <div className="landing-mobile-buttons">
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="secondary-button" style={{ width: "100%" }}>
              <LayoutDashboard />
              <span>Open Dashboard</span>
            </Link>
            <Link href="/learn/html/introduction" onClick={() => setMobileOpen(false)} className="primary-button" style={{ width: "100%" }}>
              <span>Start Learning HTML</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
