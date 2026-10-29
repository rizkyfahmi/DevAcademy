import Link from "next/link";
import { ArrowUpRight, Heart, LayoutDashboard } from "lucide-react";
import { DevAcademyLogo } from "@/components/brand/DevAcademyLogo";

export function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-top">
        <div className="landing-footer-brand">
          <Link href="/" className="landing-brand">
            <DevAcademyLogo size={32} variant="badge" />
            <span className="landing-brand-text">
              DevAcademy
              <span className="landing-brand-pill">ID</span>
            </span>
          </Link>
          <p className="landing-footer-desc">
            Interactive coding and web development platform designed with a hands-on, 
            step-by-step approach. Understand core concepts, test live code examples, 
            and practice directly in your browser.
          </p>
          <div className="landing-footer-badge-row">
            <span className="pill pill-yellow">100% Free</span>
            <span className="pill">Zero Installation Needed</span>
            <span className="pill">Beginner Friendly</span>
          </div>
        </div>

        <div className="landing-footer-grid">
          {/* Col 1 */}
          <div className="landing-footer-col">
            <h4>Core Tutorials</h4>
            <ul>
              <li><Link href="/learn/html">HTML Tutorial</Link></li>
              <li><Link href="/learn/css">CSS Styling & Flexbox</Link></li>
              <li><Link href="/learn/javascript">Modern JavaScript</Link></li>
              <li><Link href="/learn/python">Python & Data Science</Link></li>
              <li><Link href="/dashboard">All Web Tutorials <ArrowUpRight className="inline-icon" /></Link></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="landing-footer-col">
            <h4>Practice Hub</h4>
            <ul>
              <li><Link href="/dashboard">Learning Hub (Dashboard)</Link></li>
              <li><Link href="/playground">Interactive Playground</Link></li>
              <li><Link href="/exercises">Coding Exercises Bank</Link></li>
              <li><Link href="/ai-tutor">24/7 AI Tutor</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="landing-footer-col">
            <h4>References & Support</h4>
            <ul>
              <li><Link href="/glossary">Tech Glossary</Link></li>
              <li><Link href="/search">Full Tutorial Search</Link></li>
              <li><Link href="/help">Help Center & FAQ</Link></li>
              <li><Link href="/about">About DevAcademy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="landing-footer-bottom">
        <div className="footer-bottom-copy">
          <span>&copy; 2026 DevAcademy. Crafted with <Heart className="footer-heart" /> for modern software developers worldwide.</span>
          <span className="footer-subtext">Inspired by the W3Schools interactive learning methodology & modern web standards.</span>
        </div>
        <div className="footer-bottom-actions">
          <Link href="/dashboard" className="secondary-button" style={{ height: "34px", fontSize: "12px" }}>
            <LayoutDashboard style={{ width: "14px", height: "14px" }} />
            <span>Open Dashboard</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
