"use client";

import Link from "next/link";
import { useState } from "react";

export function PracticeAdventureSection() {
  const [activeTab, setActiveTab] = useState<"exercises" | "weekly">("exercises");

  return (
    <section className="w3-practice-section">
      <div className="w3-practice-top" style={{ marginBottom: 0 }}>
        <div className="w3-practice-eyebrow">TEST YOUR SKILLS</div>
        <h2 className="w3-practice-title">Practice with DevAcademy</h2>
        <p className="w3-practice-sub">
          Hands-on coding exercises and challenges.
        </p>

        <div className="w3-practice-pills">
          <Link
            href="/exercises"
            className={`w3-practice-pill-btn ${activeTab === "exercises" ? "active" : ""}`}
            onClick={() => setActiveTab("exercises")}
          >
            Exercises
          </Link>
          <Link
            href="/playground"
            className={`w3-practice-pill-btn ${activeTab === "weekly" ? "active" : ""}`}
            onClick={() => setActiveTab("weekly")}
          >
            Playground Challenges
          </Link>
        </div>
      </div>
    </section>
  );
}
