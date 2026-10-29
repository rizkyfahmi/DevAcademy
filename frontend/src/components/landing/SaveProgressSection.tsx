"use client";

import { motion } from "motion/react";
import { useAuthModal } from "@/context/AuthModalContext";

export function SaveProgressSection() {
  const { openSignIn, openRegister } = useAuthModal();

  const perks = [
    { left: "Progress tracking", right: "XP & streaks" },
    { left: "Ad-free learning", right: "Access to App" },
    { left: "Challenges", right: "Practice problems" },
    { left: "Leagues", right: "Build & host websites" },
  ];

  return (
    <section className="w3-save-section">
      <div className="w3-save-container">
        <motion.div 
          className="w3-save-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left Column */}
          <div className="w3-save-left">
            <div className="w3-save-eyebrow">FREE ACCOUNT</div>
            <h2 className="w3-save-heading">
              Save your progress.<br />Everywhere.
            </h2>
            <p className="w3-save-subtext">
              Learning is free with or without an account. Sign up to keep your XP, 
              streaks and progress, on DevAcademy and in the Adventure app.
            </p>

            <div className="w3-save-checklist">
              {perks.map((pair, idx) => (
                <div key={idx} className="w3-save-checklist-row">
                  <div className="w3-save-check-item">
                    <span className="w3-save-tick">✓</span>
                    <span>{pair.left}</span>
                  </div>
                  <div className="w3-save-check-item">
                    <span className="w3-save-tick">✓</span>
                    <span>{pair.right}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Floating Signup Box */}
          <motion.div 
            className="w3-save-right"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="w3-signup-floating-card">
              <h3 className="w3-signup-box-title">Start in one click</h3>
              <p className="w3-signup-box-sub">
                Create your free account and pick up where you left off, anywhere.
              </p>

              <div className="w3-signup-btn-stack">
                <motion.button 
                  type="button" 
                  onClick={openSignIn} 
                  className="w3-signup-btn-white"
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Sign In
                </motion.button>
                <div className="w3-signup-divider">
                  <span>or</span>
                </div>
                <motion.button 
                  type="button" 
                  onClick={openRegister} 
                  className="w3-signup-btn-dark"
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
