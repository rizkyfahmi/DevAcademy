"use client";

import { useState, useEffect, useRef } from "react";
import { Check, X, Lightbulb, Play, RotateCcw, ArrowRight } from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { useAuth } from "@/context/AuthContext";
import {
  getChapterChallengeProgress,
  saveChapterChallengeProgress,
  markChapterAsCompleted,
} from "@/lib/user-progress-store";
import { getChapterChallenge, ALL_HTML_CHAPTERS } from "@/lib/w3-html-chapters-data";
import { getChapterCssChallenge, ALL_CSS_CHAPTERS } from "@/lib/w3-css-chapters-data";
import { getChapterJsChallenge, ALL_JS_CHAPTERS } from "@/lib/w3-js-chapters-data";
import { getChapterPythonChallenge, ALL_PYTHON_CHAPTERS } from "@/lib/w3-python-chapters-data";
import { getChapterSqlChallenge, ALL_SQL_CHAPTERS } from "@/lib/w3-sql-chapters-data";
import { getOrCreateCourseMeta, normalizeTechKey, getUniversalChapterChallenge } from "@/lib/w3-all-courses-catalog";

interface DocxChapterChallengeViewProps {
  tech?: string;
  chapterKey: string;
  onNavigate: (chapterSlug: string, subSlug?: string) => void;
}

export function DocxChapterChallengeView({
  tech = "HTML",
  chapterKey,
  onNavigate,
}: DocxChapterChallengeViewProps) {
  const { user } = useAuth();
  const normalized = normalizeTechKey(tech);
  const challenge = normalized === "CSS" 
    ? getChapterCssChallenge(chapterKey) 
    : normalized === "JAVASCRIPT" 
    ? getChapterJsChallenge(chapterKey) 
    : normalized === "PYTHON"
    ? getChapterPythonChallenge(chapterKey)
    : normalized === "SQL"
    ? getChapterSqlChallenge(chapterKey)
    : normalized === "HTML"
    ? getChapterChallenge(chapterKey)
    : getUniversalChapterChallenge(normalized, chapterKey);

  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const isHydratedRef = useRef(false);

  // Hydrate challenge state
  useEffect(() => {
    isHydratedRef.current = false;
    const saved = getChapterChallengeProgress(user?.email, normalized, chapterKey);
    if (saved) {
      setUserInput(saved.userInput || "");
      setSubmitted(!!saved.submitted);
      setShowHint(!!saved.showHint);
      setShowSolution(!!saved.showSolution);
    } else {
      setUserInput("");
      setSubmitted(false);
      setShowHint(false);
      setShowSolution(false);
    }
    isHydratedRef.current = true;
  }, [user?.email, normalized, chapterKey]);

  useEffect(() => {
    if (!isHydratedRef.current) return;
    if (!userInput && !submitted && !showHint && !showSolution) return;
    saveChapterChallengeProgress(
      user?.email,
      normalized,
      chapterKey,
      {
        userInput,
        submitted,
        showHint,
        showSolution,
        updatedAt: Date.now(),
      },
      user
    );
  }, [userInput, submitted, showHint, showSolution, user, normalized, chapterKey]);

  const allChapters = normalized === "CSS" 
    ? ALL_CSS_CHAPTERS 
    : normalized === "JAVASCRIPT" 
    ? ALL_JS_CHAPTERS 
    : normalized === "PYTHON"
    ? ALL_PYTHON_CHAPTERS
    : normalized === "SQL"
    ? ALL_SQL_CHAPTERS
    : normalized === "HTML"
    ? ALL_HTML_CHAPTERS
    : getOrCreateCourseMeta(normalized).sections.flatMap((s) => s.items);

  const currentItem = allChapters.find((c) => c.slug === chapterKey);
  const title = currentItem ? currentItem.name : chapterKey.toUpperCase();

  const cleanInput = userInput.trim().toLowerCase().replace(/['"]/g, '"');
  const validAnswers = Array.isArray(challenge.correctAnswer)
    ? challenge.correctAnswer.map((a) => a.trim().toLowerCase().replace(/['"]/g, '"'))
    : [challenge.correctAnswer.trim().toLowerCase().replace(/['"]/g, '"')];

  const isCorrect = submitted && validAnswers.includes(cleanInput);
  const isWrong = submitted && !validAnswers.includes(cleanInput);

  const handleReset = () => {
    setUserInput("");
    setSubmitted(false);
    setShowHint(false);
    setShowSolution(false);
    saveChapterChallengeProgress(
      user?.email,
      normalized,
      chapterKey,
      {
        userInput: "",
        submitted: false,
        showHint: false,
        showSolution: false,
        updatedAt: Date.now(),
      },
      user
    );
  };

  const handleRevealSolution = () => {
    const solution = Array.isArray(challenge.correctAnswer)
      ? challenge.correctAnswer[0]
      : challenge.correctAnswer;
    setUserInput(solution);
    setShowSolution(true);
    setSubmitted(true);
  };

  const currentIndex = allChapters.findIndex((c) => c.slug === chapterKey);
  const nextItem = currentIndex >= 0 && currentIndex < allChapters.length - 1
    ? allChapters[currentIndex + 1]
    : null;

  return (
    <article className="w3-docx-main-content">
      {/* 1. Header Title Row */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 14 }}>
        <h1 className="w3-docx-page-title" style={{ fontSize: 32 }}>
          {title} Code Challenge
        </h1>
        <DocxBookmarkButton
          tech={tech}
          chapterSlug={`${chapterKey}-challenge`}
          title={`${title} Code Challenge`}
          url={`/learn/${tech.toLowerCase()}/${chapterKey}`}
        />
      </div>

      {/* 2. Top Nav */}
      <div className="w3-docx-top-actions" style={{ marginBottom: 18 }}>
        <button
          type="button"
          onClick={() => onNavigate(chapterKey, "exercises")}
          className="w3-docx-btn-outline"
        >
          &lt; Exercises
        </button>
        {nextItem && (
          <button
            type="button"
            onClick={() => onNavigate(nextItem.slug)}
            className="w3-docx-btn-green"
          >
            Next: {nextItem.name} &gt;
          </button>
        )}
      </div>

      <p className="w3-docx-lead-text" style={{ fontSize: 16, color: "#19232e", marginBottom: 20 }}>
        Solve the coding challenge by completing the missing code.
      </p>

      {/* 3. Challenge Container Card */}
      <div
        style={{
          background: "#e7e9eb",
          borderRadius: 8,
          padding: "24px 28px",
          margin: "16px 0 32px",
          border: "1px solid #d1d5db",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: 19, fontWeight: 700, margin: 0, color: "#19232e" }}>
            Challenge Task:
          </h2>
          <span style={{ fontSize: 12, fontWeight: 700, background: "#04aa6d", color: "#fff", padding: "3px 10px", borderRadius: 4 }}>
            Interactive
          </span>
        </div>

        <p style={{ fontSize: 15.5, color: "#282a35", lineHeight: 1.5, marginBottom: 20 }}>
          {challenge.instruction}
        </p>

        {/* Code Window with Embedded Input Field */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 6,
            borderLeft: "5px solid #04aa6d",
            padding: "20px 24px",
            fontFamily: 'Consolas, Menlo, Monaco, "Courier New", monospace',
            fontSize: 15,
            lineHeight: 1.6,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            overflowX: "auto",
          }}
        >
          <div style={{ color: "#24292e", whiteSpace: "pre-wrap" }}>
            <span>{challenge.beforeCode}</span>
            <input
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
                if (submitted) setSubmitted(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && userInput.trim()) {
                  setSubmitted(true);
                }
              }}
              placeholder={challenge.placeholder}
              aria-label="Challenge code input"
              style={{
                fontFamily: 'Consolas, Menlo, Monaco, "Courier New", monospace',
                fontSize: 15,
                fontWeight: 700,
                color: isCorrect ? "#04aa6d" : isWrong ? "#ef4444" : "#111827",
                background: isCorrect ? "#ecfdf5" : isWrong ? "#fef2f2" : "#f1f5f9",
                border: `2px solid ${isCorrect ? "#04aa6d" : isWrong ? "#ef4444" : "#0284c7"}`,
                borderRadius: 4,
                padding: "3px 8px",
                margin: "0 4px",
                outline: "none",
                minWidth: 120,
                width: `${Math.max(12, userInput.length + 3)}ch`,
                transition: "all 0.15s ease",
              }}
            />
            <span>{challenge.afterCode}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => {
              if (userInput.trim()) {
                setSubmitted(true);
              }
            }}
            disabled={!userInput.trim()}
            className="w3-docx-btn-green"
            style={{
              padding: "10px 24px",
              cursor: userInput.trim() ? "pointer" : "not-allowed",
              opacity: userInput.trim() ? 1 : 0.6,
            }}
          >
            Submit Answer &gt;
          </button>

          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            style={{
              background: "#ffffff",
              color: "#374151",
              border: "1px solid #cbd5e1",
              padding: "9px 16px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
            }}
          >
            <Lightbulb style={{ width: 16, height: 16, color: "#eab308" }} />
            <span>{showHint ? "Hide Hint" : "Hint"}</span>
          </button>

          <button
            type="button"
            onClick={handleRevealSolution}
            style={{
              background: "#ffffff",
              color: "#374151",
              border: "1px solid #cbd5e1",
              padding: "9px 16px",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Show Solution
          </button>

          {(submitted || userInput) && (
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: "transparent",
                color: "#64748b",
                border: "none",
                padding: "8px 12px",
                fontSize: 14,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "inherit",
              }}
            >
              <RotateCcw style={{ width: 14, height: 14 }} />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Hint Box */}
        {showHint && (
          <div
            style={{
              marginTop: 18,
              padding: "12px 18px",
              background: "#fef9c3",
              borderLeft: "4px solid #eab308",
              borderRadius: "0 4px 4px 0",
              fontSize: 14,
              color: "#713f12",
            }}
          >
            <strong>Hint: </strong> {challenge.hint}
          </div>
        )}

        {/* Feedback Alert */}
        {submitted && (
          <div
            style={{
              marginTop: 20,
              padding: "16px 20px",
              borderRadius: 6,
              background: isCorrect ? "#dcfce7" : "#fee2e2",
              border: `1px solid ${isCorrect ? "#86efac" : "#fca5a5"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: isCorrect ? "#15803d" : "#b91c1c" }}>
                {isCorrect
                  ? "🎉 Correct! Outstanding work!"
                  : "Not quite right yet. Double check the syntax and try again!"}
              </p>
              {isCorrect && showSolution && (
                <p style={{ margin: "4px 0 0", fontSize: 13.5, color: "#166534" }}>
                  Solution revealed. Try typing it yourself to build muscle memory!
                </p>
              )}
            </div>

            {isCorrect && nextItem && (
              <button
                type="button"
                onClick={() => onNavigate(nextItem.slug)}
                className="w3-docx-btn-green"
                style={{
                  padding: "8px 18px",
                  fontSize: 13.5,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span>Next: {nextItem.name}</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>
        )}

        {/* Live Preview Container */}
        <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px dashed #cbd5e1" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Live Rendered Output:
          </div>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: 6,
              padding: "18px 20px",
              minHeight: 60,
            }}
            dangerouslySetInnerHTML={{
              __html: challenge.previewSnippet(userInput),
            }}
          />
        </div>
      </div>

      {/* 4. Bottom Nav */}
      <div className="w3-docx-top-actions" style={{ marginTop: 28, marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => onNavigate(chapterKey, "exercises")}
          className="w3-docx-btn-outline"
        >
          &lt; Exercises
        </button>
        {nextItem && (
          <button
            type="button"
            onClick={() => onNavigate(nextItem.slug)}
            className="w3-docx-btn-green"
          >
            Next: {nextItem.name} &gt;
          </button>
        )}
      </div>
    </article>
  );
}
