"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { useAuthModal } from "@/context/AuthModalContext";
import { useAuth } from "@/context/AuthContext";
import { getHomeQuizProgress, saveHomeQuizProgress } from "@/lib/user-progress-store";

interface DocxHtmlIntroductionExercisesContentProps {
  onGoPrevious: () => void;
  onGoNext: () => void;
}

export function DocxHtmlIntroductionExercisesContent({
  onGoPrevious,
  onGoNext,
}: DocxHtmlIntroductionExercisesContentProps) {
  const { openSignIn } = useAuthModal();
  const { user } = useAuth();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const saved =
      getHomeQuizProgress(user?.email, "HTML_INTRO_EX") ||
      getHomeQuizProgress(null, "HTML_INTRO_EX");
    if (saved && saved.selectedAnswer !== null && saved.selectedAnswer !== undefined) {
      const parsed = Number(saved.selectedAnswer);
      if (!Number.isNaN(parsed)) {
        setSelectedOption(parsed);
      }
      setSubmitted(!!saved.submitted);
    }
  }, [user?.email]);

  const options = [
    "Hot Typing Markup Language",
    "Home Typing Modern Language",
    "Hyper Text Markup Language",
    "Home Testing Mixed Language",
  ];
  const correctIndex = 2; // "Hyper Text Markup Language"

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    saveHomeQuizProgress(user?.email, "HTML_INTRO_EX", String(selectedOption), true, user);
  };

  const isCorrect = submitted && selectedOption === correctIndex;
  const isWrong = submitted && selectedOption !== null && selectedOption !== correctIndex;

  return (
    <article className="w3-docx-main-content">
      {/* 1. Header Title Row */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 14 }}>
        <h1 className="w3-docx-page-title" style={{ fontSize: 36 }}>
          HTML Introduction Exercises
        </h1>
        <DocxBookmarkButton
          tech="HTML"
          chapterSlug="html-introduction-exercises"
          title="HTML Introduction Exercises"
          url="/learn/html/html-introduction/exercises"
        />
      </div>

      {/* 2. Top Nav (< Previous / Next >) */}
      <div className="w3-docx-top-actions" style={{ marginBottom: 18 }}>
        <button
          type="button"
          onClick={onGoPrevious}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={onGoNext}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>

      <p className="w3-docx-lead-text" style={{ fontSize: 15, color: "#19232e", marginBottom: 24 }}>
        Test what you have learned about HTML introduction.
      </p>

      {/* 3. Dark Exercise Card Container (Matching User Screenshot) */}
      <div
        style={{
          background: "#1d2a35",
          borderRadius: 8,
          padding: "36px 32px 30px",
          color: "#ffffff",
          textAlign: "center",
          boxShadow: "0 4px 18px rgba(0, 0, 0, 0.08)",
          marginBottom: 36,
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 14px",
            letterSpacing: "-0.01em",
          }}
        >
          HTML Exercise 1 of 1
        </h2>

        {/* Subtle decorative divider line */}
        <div
          style={{
            width: 140,
            height: 2,
            background: "rgba(255, 255, 255, 0.15)",
            margin: "0 auto 20px",
          }}
        />

        <h3
          style={{
            fontSize: 16.5,
            fontWeight: 700,
            color: "#ffffff",
            margin: "0 0 22px",
          }}
        >
          What does HTML stand for?
        </h3>

        {/* 4 Pill-shaped Options */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxWidth: 580,
            margin: "0 auto 24px",
            textAlign: "left",
          }}
        >
          {options.map((optionText, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={optionText}
                type="button"
                onClick={() => {
                  setSelectedOption(idx);
                  setSubmitted(false);
                  saveHomeQuizProgress(user?.email, "HTML_INTRO_EX", String(idx), false, user);
                }}
                style={{
                  background: isSelected ? "#2d3e4e" : "#3b4854",
                  border: isSelected ? "2px solid #04aa6d" : "2px solid transparent",
                  borderRadius: 6,
                  padding: "12px 18px",
                  color: "#ffffff",
                  fontSize: 14.5,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  transition: "background 0.15s, border-color 0.15s",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    border: isSelected ? "5px solid #04aa6d" : "2px solid #cbd5e1",
                    background: isSelected ? "#ffffff" : "transparent",
                    display: "inline-block",
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                />
                <span>{optionText}</span>
              </button>
            );
          })}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="w3-docx-btn-green"
            style={{
              padding: "10px 24px",
              fontSize: 14,
              borderRadius: 4,
              opacity: selectedOption === null ? 0.6 : 1,
              cursor: selectedOption === null ? "not-allowed" : "pointer",
            }}
          >
            Submit Answer »
          </button>
        </div>

        {/* Answer Feedback Banner */}
        {submitted && (
          <div
            style={{
              maxWidth: 580,
              margin: "20px auto 0",
              padding: "12px 18px",
              borderRadius: 6,
              background: isCorrect ? "#064e3b" : "#7f1d1d",
              border: isCorrect ? "1px solid #059669" : "1px solid #dc2626",
              color: isCorrect ? "#a7f3d0" : "#fecaca",
              display: "flex",
              alignItems: "center",
              gap: 12,
              textAlign: "left",
              fontSize: 14,
            }}
          >
            {isCorrect ? (
              <>
                <Check style={{ width: 20, height: 20, color: "#34d399", flexShrink: 0 }} />
                <span>
                  <strong>Correct!</strong> HTML stands for <strong>Hyper Text Markup Language</strong>.
                </span>
              </>
            ) : (
              <>
                <X style={{ width: 20, height: 20, color: "#f87171", flexShrink: 0 }} />
                <span>
                  <strong>Not quite!</strong> The correct answer is <strong>Hyper Text Markup Language</strong>. Try again!
                </span>
              </>
            )}
          </div>
        )}


      </div>

      {/* 4. Bottom Nav (< Previous / Next >) */}
      <div className="w3-docx-bottom-nav">
        <button
          type="button"
          onClick={onGoPrevious}
          className="w3-docx-btn-outline"
        >
          &lt; Previous
        </button>
        <button
          type="button"
          onClick={onGoNext}
          className="w3-docx-btn-green"
        >
          Next &gt;
        </button>
      </div>
    </article>
  );
}
