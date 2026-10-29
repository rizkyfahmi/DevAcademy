"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { DevAcademyLogo } from "@/components/brand/DevAcademyLogo";

export function DarkFooter() {
  return (
    <motion.footer 
      className="w3-dark-footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="w3-footer-container">
        {/* Top Header Row with Logo and Main Links */}
        <div className="w3-footer-top-row">
          <Link href="/" className="w3-footer-logo">
            <DevAcademyLogo size={28} variant="badge" />
            <span className="w3-footer-name">DevAcademy</span>
          </Link>

          <div className="w3-footer-top-links">
            <Link href="/dashboard">TUTORIALS</Link>
            <Link href="/learn/html">HTML</Link>
            <Link href="/learn/css">CSS</Link>
            <Link href="/learn/javascript">JAVASCRIPT</Link>
            <Link href="/learn/python">PYTHON</Link>
            <Link href="/learn/sql">SQL</Link>
          </div>
        </div>

        {/* 4 Column Directory */}
        <div className="w3-footer-col-grid">
          {/* Col 1 */}
          <div className="w3-footer-col">
            <h4>Frontend Tutorials</h4>
            <ul>
              <li><Link href="/learn/html">HTML Tutorial</Link></li>
              <li><Link href="/learn/css">CSS Tutorial</Link></li>
              <li><Link href="/learn/javascript">JavaScript Tutorial</Link></li>
              <li><Link href="/learn/bootstrap">Bootstrap Tutorial</Link></li>
              <li><Link href="/learn/react">React Tutorial</Link></li>
              <li><Link href="/learn/howto">How To Guide</Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="w3-footer-col">
            <h4>Backend & Databases</h4>
            <ul>
              <li><Link href="/learn/sql">SQL Tutorial</Link></li>
              <li><Link href="/learn/python">Python Tutorial</Link></li>
              <li><Link href="/learn/php">PHP Tutorial</Link></li>
              <li><Link href="/learn/java">Java Tutorial</Link></li>
              <li><Link href="/learn/cpp">C++ Tutorial</Link></li>
              <li><Link href="/learn/csharp">C# Tutorial</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="w3-footer-col">
            <h4>Popular Topics</h4>
            <ul>
              <li><Link href="/learn/html/html_intro">HTML Introduction</Link></li>
              <li><Link href="/learn/css/css_intro">CSS Introduction</Link></li>
              <li><Link href="/learn/javascript/js_intro">JavaScript Intro</Link></li>
              <li><Link href="/learn/python/python_intro">Python Intro</Link></li>
              <li><Link href="/learn/sql/sql_intro">SQL Intro</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="w3-footer-col">
            <h4>Halaman Materi</h4>
            <ul>
              <li><Link href="/dashboard">Docx Hub</Link></li>
              <li><Link href="/learn/html">HTML Hub</Link></li>
              <li><Link href="/learn/css">CSS Hub</Link></li>
              <li><Link href="/learn/javascript">JavaScript Hub</Link></li>
              <li><Link href="/learn/python">Python Hub</Link></li>
              <li><Link href="/learn/sql">SQL Hub</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons & Bottom Badges */}
        <div className="w3-footer-bottom-bar">
          <div className="w3-footer-social-row" suppressHydrationWarning>
            <span className="w3-soc-item">LinkedIn</span>
            <span className="w3-soc-item">Discord</span>
            <span className="w3-soc-item">Facebook</span>
            <span className="w3-soc-item">Instagram</span>
            <Link href="/dashboard" className="w3-soc-link">MATERI</Link>
            <Link href="/" className="w3-soc-link">BERANDA</Link>
            <Link href="/dashboard" className="w3-soc-link">ACADEMY</Link>
          </div>

          <p className="w3-footer-disclaimer">
            DevAcademy is optimized for learning and training. Examples might be simplified to improve reading and learning.
            Tutorials, references, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content.
            While using DevAcademy, you agree to have read and accepted our terms of use, cookie and privacy policy.
          </p>

          <p className="w3-footer-copyright">
            Copyright 2026 by DevAcademy. All Rights Reserved. DevAcademy is Powered by SyntaxLab.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
