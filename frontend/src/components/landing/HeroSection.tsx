"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useAuthModal } from "@/context/AuthModalContext";

interface SlideData {
  id: string;
  title: string;
  subtitle: string;
  visual: React.ReactNode;
}

const SLIDES: SlideData[] = [
  {
    id: "avatar",
    title: "Customize your avatar",
    subtitle: "Unlock gear, moods & rare skins",
    visual: (
      <div className="w3-avatar-stage">
        <div className="w3-avatar-circle main-mascot">
          <span className="w3-mascot-emoji">🦊</span>
        </div>
        <div className="w3-avatar-circle small-sub-1">
          <span className="w3-mascot-emoji">⚡</span>
        </div>
        <div className="w3-avatar-circle small-sub-2">
          <span className="w3-mascot-emoji">🕶️</span>
        </div>
      </div>
    ),
  },
  {
    id: "sites",
    title: "Build & host sites",
    subtitle: "Your own website, live on the web",
    visual: (
      <div className="w3-slide-browser-mini">
        <div className="w3-mini-bar">
          <span className="mini-dot r" />
          <span className="mini-dot y" />
          <span className="mini-dot g" />
          <span className="mini-url">cafe.devacademy.dev</span>
        </div>
        <div className="w3-mini-body">
          <div className="w3-mini-code-side">
            <span className="mini-code-line tg">&lt;h1&gt;</span>
            <span className="mini-code-line txt">Where Every Cup</span>
            <span className="mini-code-line tg">&lt;/h1&gt;</span>
          </div>
          <div className="w3-mini-preview-side">
            <div className="w3-mini-card-photo">
              <span>☕ CAFE</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "practice",
    title: "Weekly practice",
    subtitle: "Fresh problems & bonus XP",
    visual: (
      <div className="w3-slide-tablet-mini">
        <div className="w3-mini-tablet-frame">
          <div className="w3-tablet-header">
            <span className="dot g" />
            <span className="tablet-title">Weekly Quiz Challenge</span>
          </div>
          <div className="w3-tablet-content">
            <div className="w3-tablet-left">
              <span className="w3-quiz-badge">Level 3</span>
              <strong>HTML & CSS</strong>
            </div>
            <div className="w3-tablet-right">
              <span className="w3-confetti c1">✨</span>
              <span className="w3-confetti c2">🎉</span>
              <span className="w3-confetti c3">⭐</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "adfree",
    title: "Ad-free learning",
    subtitle: "Focus with zero distractions",
    visual: (
      <div className="w3-slide-adfree-stage">
        <div className="w3-adfree-circle">
          <svg viewBox="0 0 48 48" width="54" height="54" fill="none">
            <circle cx="24" cy="24" r="20" stroke="#04aa6d" strokeWidth="4.5" />
            <line x1="10" y1="38" x2="38" y2="10" stroke="#04aa6d" strokeWidth="4.5" />
          </svg>
        </div>
      </div>
    ),
  },
  {
    id: "leveling",
    title: "Keep learning. Keep leveling up.",
    subtitle: "Track your progress and achieve more.",
    visual: (
      <div className="w3-slide-level-stage">
        <div className="w3-level-main-score">
          <span className="w3-bolt-icon">⚡</span>
          <span className="w3-bolt-num">12,560</span>
        </div>
        <div className="w3-level-stats-row">
          <div className="w3-stat-item-box">
            <span className="w3-stat-label">XP this week</span>
            <strong className="w3-stat-number">850</strong>
          </div>
          <div className="w3-stat-divider" />
          <div className="w3-stat-item-box">
            <span className="w3-fire-icon">🔥</span>
            <strong className="w3-stat-number">7</strong>
            <span className="w3-stat-label">Day streak</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "leagues",
    title: "Climb the leagues",
    subtitle: "From Wood to Master Coder",
    visual: (
      <div className="w3-slide-leagues-stage">
        <div className="w3-league-badge bronze">
          <span className="badge-core">🪙</span>
        </div>
        <span className="w3-league-caret">&rsaquo;</span>
        <div className="w3-league-badge silver">
          <span className="badge-core">🛡️</span>
        </div>
        <span className="w3-league-caret">&rsaquo;</span>
        <div className="w3-league-badge grandmaster">
          <span className="badge-core">👑</span>
        </div>
      </div>
    ),
  },
];

export function HeroSection() {
  const { openSignIn } = useAuthModal();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slide every 3 seconds (3000ms) with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = SLIDES[activeSlide];

  const checklist = [
    { label: "Track your learning progress" },
    { label: "Build & host real websites" },
    { label: "100% Ad-free experience" },
    { label: "XP & Daily Streaks" },
    { label: "Hundreds of practice problems" },
    { label: "Competitive Leagues" },
    { label: "Weekly coding challenges" },
    { label: "Custom avatars & 24/7 AI Tutor" },
  ];

  return (
    <section className="w3-hero-dark">
      <div className="w3-hero-container">
        {/* Left Column: Copy & Checklist */}
        <motion.div 
          className="w3-hero-left"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="w3-hero-title">Learn to Code</h1>
          <p className="w3-hero-subtitle">
            Free tutorials, examples and references.
          </p>
          <p className="w3-hero-highlight">
            No sign-up needed, just start learning.
          </p>

          <p className="w3-hero-opt-in">
            Or sign in to unlock everything:
          </p>

          <div className="w3-hero-checklist">
            {checklist.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="w3-check-item"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
              >
                <span className="w3-check-icon">✓</span>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="w3-hero-member-note">
            Already a member?{" "}
            <button type="button" onClick={openSignIn} className="w3-member-link">
              Sign in
            </button>
          </div>
        </motion.div>

        {/* Right Column: Animated Auto-sliding Carousel Card (3 seconds) */}
        <motion.div 
          className="w3-hero-right"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="w3-avatar-card">
            <div className="w3-card-lock-badge" title="Included Free">
              🔒
            </div>

            {/* Dynamic Visual Content */}
            <AnimatePresence mode="wait">
              <motion.div 
                className="w3-slide-visual-container" 
                key={current.id}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {current.visual}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div 
                className="w3-slide-text-container" 
                key={"text-" + current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <h3 className="w3-avatar-heading">{current.title}</h3>
                <p className="w3-avatar-sub">{current.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            <motion.button 
              type="button" 
              onClick={openSignIn} 
              className="w3-hero-btn-green"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Sign in</span>
            </motion.button>

            {/* Interactive Pagination Dots (6 slides) */}
            <div className="w3-avatar-dots" aria-label="Slide Indicator">
              {SLIDES.map((_, idx) => (
                <motion.button
                  key={idx}
                  type="button"
                  aria-label={`Ke slide ${idx + 1}`}
                  className={`w3-dot ${idx === activeSlide ? "active" : ""}`}
                  onClick={() => setActiveSlide(idx)}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
