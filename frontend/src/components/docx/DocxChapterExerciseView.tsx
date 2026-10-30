"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Check, X, ArrowRight, RotateCcw, Trophy, Award, Sparkles, BookOpen } from "lucide-react";
import { DocxBookmarkButton } from "./DocxBookmarkButton";
import { useAuthModal } from "@/context/AuthModalContext";
import { useAuth } from "@/context/AuthContext";
import {
  getChapterExerciseProgress,
  saveChapterExerciseProgress,
  markChapterAsCompleted,
} from "@/lib/user-progress-store";
import { ALL_HTML_CHAPTERS } from "@/lib/w3-html-chapters-data";
import { ALL_CSS_CHAPTERS } from "@/lib/w3-css-chapters-data";
import { ALL_JS_CHAPTERS } from "@/lib/w3-js-chapters-data";
import { ALL_PYTHON_CHAPTERS } from "@/lib/w3-python-chapters-data";
import { ALL_SQL_CHAPTERS } from "@/lib/w3-sql-chapters-data";
import { getOrCreateCourseMeta, normalizeTechKey } from "@/lib/w3-all-courses-catalog";
import { getThreeExercisesForChapter, ExerciseQuestion } from "@/lib/w3-three-exercises";

interface DocxChapterExerciseViewProps {
  tech?: string;
  chapterKey: string;
  onNavigate: (chapterSlug: string, subSlug?: string) => void;
}

export function DocxChapterExerciseView({
  tech = "HTML",
  chapterKey,
  onNavigate,
}: DocxChapterExerciseViewProps) {
  const { openSignIn } = useAuthModal();
  const { user } = useAuth();
  const normalized = normalizeTechKey(tech);

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

  const currentIndexInList = allChapters.findIndex((c) => c.slug === chapterKey);
  const currentItem = allChapters[currentIndexInList];
  const nextChapter = allChapters[currentIndexInList + 1];
  const title = currentItem ? currentItem.name : chapterKey.replace(/-/g, " ").toUpperCase();

  // Load the 3 questions for this chapter and tech
  const rawQuestions = useMemo(() => {
    return getThreeExercisesForChapter(tech, chapterKey, title);
  }, [tech, chapterKey, title]);

  // Deterministically shuffle/rotate option positions per question so correct answer varies across A, B, C, D
  const questions: ExerciseQuestion[] = useMemo(() => {
    return rawQuestions.map((q, idx) => {
      const shift = (idx * 2 + 1) % q.options.length;
      const correctText = q.options[q.correctIndex];
      const newOptions = [...q.options];
      for (let i = 0; i < shift; i++) {
        const item = newOptions.shift()!;
        newOptions.push(item);
      }
      return {
        ...q,
        options: newOptions,
        correctIndex: newOptions.indexOf(correctText),
      };
    });
  }, [rawQuestions]);

  // Exercise interactive state
  const [currentIdx, setCurrentIdx] = useState(0); // 0, 1, 2
  const [userSelections, setUserSelections] = useState<Record<number, number | null>>({
    0: null,
    1: null,
    2: null,
  });
  const [submittedMap, setSubmittedMap] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
  });
  const [showAnswerMap, setShowAnswerMap] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const isHydratedRef = useRef(false);

  // Hydrate saved state for this chapter exercise on mount / chapterKey / user change
  useEffect(() => {
    isHydratedRef.current = false;
    const saved = getChapterExerciseProgress(user?.email, normalized, chapterKey);
    if (saved) {
      setCurrentIdx(typeof saved.currentIdx === "number" ? saved.currentIdx : 0);
      setUserSelections(saved.userSelections || { 0: null, 1: null, 2: null });
      setSubmittedMap(saved.submittedMap || { 0: false, 1: false, 2: false });
      setShowAnswerMap(saved.showAnswerMap || { 0: false, 1: false, 2: false });
      setIsCompleted(!!saved.isCompleted);
    } else {
      setCurrentIdx(0);
      setUserSelections({ 0: null, 1: null, 2: null });
      setSubmittedMap({ 0: false, 1: false, 2: false });
      setShowAnswerMap({ 0: false, 1: false, 2: false });
      setIsCompleted(false);
    }
    isHydratedRef.current = true;
  }, [user?.email, normalized, chapterKey]);

  // Listen for cloud sync completion
  useEffect(() => {
    const handleCloudSynced = () => {
      const saved = getChapterExerciseProgress(user?.email, normalized, chapterKey);
      if (saved) {
        setCurrentIdx(typeof saved.currentIdx === "number" ? saved.currentIdx : 0);
        setUserSelections(saved.userSelections || { 0: null, 1: null, 2: null });
        setSubmittedMap(saved.submittedMap || { 0: false, 1: false, 2: false });
        setShowAnswerMap(saved.showAnswerMap || { 0: false, 1: false, 2: false });
        setIsCompleted(!!saved.isCompleted);
      }
    };
    window.addEventListener("devacademy-cloud-synced", handleCloudSynced);
    return () => window.removeEventListener("devacademy-cloud-synced", handleCloudSynced);
  }, [user?.email, normalized, chapterKey]);

  // Save state whenever user interacts
  useEffect(() => {
    if (!isHydratedRef.current) return;
    const hasInteraction =
      currentIdx > 0 ||
      isCompleted ||
      Object.values(userSelections).some((v) => v !== null) ||
      Object.values(submittedMap).some(Boolean);
    if (!hasInteraction) return;

    saveChapterExerciseProgress(
      user?.email,
      normalized,
      chapterKey,
      {
        currentIdx,
        userSelections,
        submittedMap,
        showAnswerMap,
        isCompleted,
        updatedAt: Date.now(),
      },
      user
    );
  }, [currentIdx, userSelections, submittedMap, showAnswerMap, isCompleted, user, normalized, chapterKey]);

  const currentQ = questions[currentIdx] || questions[0];
  const selectedOption = userSelections[currentIdx] ?? null;
  const isSubmitted = submittedMap[currentIdx] || false;
  const isShowAnswer = showAnswerMap[currentIdx] || false;

  const isCurrentCorrect = isSubmitted && selectedOption === currentQ.correctIndex;
  const isCurrentWrong = isSubmitted && selectedOption !== null && selectedOption !== currentQ.correctIndex;

  // Calculate total score
  const correctCount = useMemo(() => {
    let count = 0;
    questions.forEach((q, idx) => {
      if (userSelections[idx] === q.correctIndex) {
        count += 1;
      }
    });
    return count;
  }, [questions, userSelections]);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setUserSelections((prev) => ({ ...prev, [currentIdx]: idx }));
  };

  const handleSubmitCurrent = () => {
    if (selectedOption === null) return;
    setSubmittedMap((prev) => ({ ...prev, [currentIdx]: true }));
    markChapterAsCompleted(user?.email, normalized, chapterKey, user);
    if (user) {
      fetch("/api/progress/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tech: normalized, chapterSlug: chapterKey }),
      }).catch(() => {});
    }
  };

  const handleResetCurrent = () => {
    setUserSelections((prev) => ({ ...prev, [currentIdx]: null }));
    setSubmittedMap((prev) => ({ ...prev, [currentIdx]: false }));
    setShowAnswerMap((prev) => ({ ...prev, [currentIdx]: false }));
  };

  const handleResetAll = () => {
    setCurrentIdx(0);
    setUserSelections({ 0: null, 1: null, 2: null });
    setSubmittedMap({ 0: false, 1: false, 2: false });
    setShowAnswerMap({ 0: false, 1: false, 2: false });
    setIsCompleted(false);
    saveChapterExerciseProgress(
      user?.email,
      normalized,
      chapterKey,
      {
        currentIdx: 0,
        userSelections: { 0: null, 1: null, 2: null },
        submittedMap: { 0: false, 1: false, 2: false },
        showAnswerMap: { 0: false, 1: false, 2: false },
        isCompleted: false,
        updatedAt: Date.now(),
      },
      user
    );
  };

  const handleNextQuestion = () => {
    if (currentIdx < 2) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleGoToNextChapter = () => {
    if (nextChapter) {
      onNavigate(nextChapter.slug, nextChapter.slug);
    } else {
      onNavigate("home", "home");
    }
  };

  const optionLetters = ["A", "B", "C", "D"];

  return (
    <article className="w3-docx-main-content">
      {/* 1. Header Title Row */}
      <div className="w3-docx-header-title-row" style={{ marginBottom: 14 }}>
        <h1 className="w3-docx-page-title" style={{ fontSize: 32 }}>
          {title} Exercise
        </h1>
        <DocxBookmarkButton
          tech={tech}
          chapterSlug={`${chapterKey}-exercise`}
          title={`${title} Exercise`}
          url={`/learn/${tech.toLowerCase()}/${chapterKey}?sub=exercises`}
        />
      </div>

      {/* 2. Top Nav (< Tutorial / Next Chapter >) */}
      <div className="w3-docx-top-actions" style={{ marginBottom: 20 }}>
        <button
          type="button"
          onClick={() => onNavigate(chapterKey, chapterKey)}
          className="w3-docx-btn-outline"
        >
          &lt; Tutorial
        </button>
        <button
          type="button"
          onClick={handleGoToNextChapter}
          className="w3-docx-btn-green"
        >
          {nextChapter ? `Next: ${nextChapter.name} >` : "Next Chapter >"}
        </button>
      </div>

      <p className="w3-docx-lead-text" style={{ fontSize: 16, color: "#19232e", marginBottom: 20 }}>
        Uji pemahamanmu tentang materi <strong>{title}</strong> dengan menyelesaikan 3 soal latihan interaktif di bawah ini.
      </p>

      {/* 3. Question Step Pills (Soal 1 / Soal 2 / Soal 3) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        {[0, 1, 2].map((idx) => {
          const isActive = currentIdx === idx && !isCompleted;
          const isDone = submittedMap[idx];
          const isRight = isDone && userSelections[idx] === questions[idx].correctIndex;
          const isBad = isDone && userSelections[idx] !== questions[idx].correctIndex;

          let badgeBg = "#f1f5f9";
          let badgeBorder = "#cbd5e1";
          let badgeColor = "#475569";

          if (isActive) {
            badgeBg = "#04aa6d";
            badgeBorder = "#04aa6d";
            badgeColor = "#ffffff";
          } else if (isRight) {
            badgeBg = "#e8f6ef";
            badgeBorder = "#04aa6d";
            badgeColor = "#04aa6d";
          } else if (isBad) {
            badgeBg = "#fef2f2";
            badgeBorder = "#ef4444";
            badgeColor = "#ef4444";
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => {
                if (!isCompleted) {
                  setCurrentIdx(idx);
                }
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                border: `2px solid ${badgeBorder}`,
                background: badgeBg,
                color: badgeColor,
                cursor: isCompleted ? "default" : "pointer",
                transition: "all 0.15s ease",
              }}
            >
              <span>Soal {idx + 1}</span>
              {isRight && <Check style={{ width: 14, height: 14 }} />}
              {isBad && <X style={{ width: 14, height: 14 }} />}
            </button>
          );
        })}

        <div style={{ marginLeft: "auto", fontSize: 13.5, color: "#64748b", fontWeight: 600 }}>
          {isCompleted ? "3 dari 3 Selesai" : `${currentIdx + 1} dari 3`}
        </div>
      </div>

      {/* 4. MAIN EXERCISE BODY (Active Question OR Completion Results) */}
      {!isCompleted ? (
        <div
          style={{
            background: "#1d2a35",
            borderRadius: 10,
            padding: "36px 32px 32px",
            color: "#ffffff",
            textAlign: "center",
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.12)",
            marginBottom: 36,
          }}
        >
          {/* Practice Badge */}
          <div
            style={{
              display: "inline-block",
              background: "#04aa6d",
              color: "#ffffff",
              padding: "4px 14px",
              borderRadius: 4,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.05em",
              marginBottom: 16,
            }}
          >
            {currentIdx + 1} dari 3
          </div>

          {/* Question Text */}
          <h2
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: 26,
              maxWidth: 680,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.5,
            }}
          >
            {currentQ.question}
          </h2>

          {/* 4 Options Choices */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              maxWidth: 580,
              margin: "0 auto 28px",
            }}
          >
            {currentQ.options.map((optText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isThisCorrect = (isSubmitted || isShowAnswer) && optIdx === currentQ.correctIndex;
              const isThisWrong = isSubmitted && isSelected && optIdx !== currentQ.correctIndex;

              let bgColor = "#28343e";
              let borderColor = "#38444d";
              let textColor = "#ffffff";

              if (isThisCorrect) {
                bgColor = "#04aa6d";
                borderColor = "#04aa6d";
                textColor = "#ffffff";
              } else if (isThisWrong) {
                bgColor = "#ef4444";
                borderColor = "#ef4444";
                textColor = "#ffffff";
              } else if (isSelected) {
                bgColor = "#38444d";
                borderColor = "#04aa6d";
              }

              return (
                <button
                  key={optText}
                  type="button"
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isSubmitted}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 20px",
                    background: bgColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: 8,
                    color: textColor,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: isSubmitted ? "default" : "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    fontFamily: "inherit",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 4,
                        background: isThisCorrect ? "#027a4d" : isThisWrong ? "#b91c1c" : isSelected ? "#04aa6d" : "#3b4754",
                        color: "#ffffff",
                        fontSize: 12,
                        fontWeight: 750,
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      {optionLetters[optIdx]}
                    </span>
                    <span>{optText}</span>
                  </div>

                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: `2px solid ${isThisCorrect || isThisWrong || isSelected ? "#ffffff" : "#64748b"}`,
                      background: isThisCorrect ? "#04aa6d" : isThisWrong ? "#ef4444" : isSelected ? "#04aa6d" : "transparent",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    {isThisCorrect && <Check style={{ width: 14, height: 14, color: "#fff" }} />}
                    {isThisWrong && <X style={{ width: 14, height: 14, color: "#fff" }} />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitCurrent}
                disabled={selectedOption === null}
                style={{
                  background: selectedOption !== null ? "#04aa6d" : "#4b5563",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 36px",
                  borderRadius: 6,
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: selectedOption !== null ? "pointer" : "not-allowed",
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
              >
                Periksa Jawaban &gt;
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleResetCurrent}
                  style={{
                    background: "#38444d",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px 22px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <RotateCcw style={{ width: 15, height: 15 }} />
                  <span>Coba Lagi</span>
                </button>

                {!isShowAnswer && isCurrentWrong && (
                  <button
                    type="button"
                    onClick={() => setShowAnswerMap((prev) => ({ ...prev, [currentIdx]: true }))}
                    style={{
                      background: "transparent",
                      color: "#94a3b8",
                      border: "1px solid #475569",
                      padding: "12px 20px",
                      borderRadius: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Lihat Kunci Jawaban
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="w3-docx-btn-green"
                  style={{
                    padding: "12px 28px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span>{currentIdx < 2 ? "Soal Berikutnya >" : "Lihat Hasil Latihan 🎉"}</span>
                  <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </>
            )}
          </div>

          {/* Feedback Explanation Alert */}
          {isSubmitted && (
            <div
              style={{
                marginTop: 24,
                padding: "16px 20px",
                borderRadius: 8,
                background: isCurrentCorrect ? "rgba(4, 170, 109, 0.15)" : "rgba(239, 68, 68, 0.15)",
                border: `1px solid ${isCurrentCorrect ? "#04aa6d" : "#ef4444"}`,
                maxWidth: 580,
                margin: "24px auto 0",
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                {isCurrentCorrect ? (
                  <>
                    <Check style={{ width: 18, height: 18, color: "#04aa6d" }} />
                    <strong style={{ color: "#04aa6d", fontSize: 15 }}>Jawaban Benar!</strong>
                  </>
                ) : (
                  <>
                    <X style={{ width: 18, height: 18, color: "#ef4444" }} />
                    <strong style={{ color: "#ef4444", fontSize: 15 }}>Jawaban Belum Tepat.</strong>
                  </>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#d1d5db", lineHeight: 1.5 }}>
                {currentQ.explanation}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* 5. COMPLETION SUMMARY CARD (When all 3 questions finished) */
        <div
          style={{
            background: "#1d2a35",
            borderRadius: 12,
            padding: "40px 32px 36px",
            color: "#ffffff",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: "50%",
              background: correctCount === 3 ? "rgba(4, 170, 109, 0.2)" : "rgba(234, 179, 8, 0.2)",
              border: `2px solid ${correctCount === 3 ? "#04aa6d" : "#eab308"}`,
              display: "grid",
              placeItems: "center",
              margin: "0 auto 20px",
            }}
          >
            {correctCount === 3 ? (
              <Trophy style={{ width: 34, height: 34, color: "#04aa6d" }} />
            ) : (
              <Award style={{ width: 34, height: 34, color: "#eab308" }} />
            )}
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", margin: "0 0 10px" }}>
            {correctCount === 3
              ? "Luar Biasa! Skor Sempurna 🎉"
              : correctCount >= 2
              ? "Bagus Sekali! Latihan Selesai 👍"
              : "Latihan Selesai, Terus Berlatih! 💪"}
          </h2>

          <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 540, margin: "0 auto 24px" }}>
            Kamu telah menyelesaikan 3 soal latihan pada materi <strong>{title}</strong>.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "#28343e",
              padding: "10px 24px",
              borderRadius: 30,
              fontSize: 16,
              fontWeight: 750,
              color: "#ffffff",
              marginBottom: 32,
              border: "1px solid #38444d",
            }}
          >
            <span>Skor Kamu:</span>
            <span style={{ color: correctCount === 3 ? "#04aa6d" : "#fbbf24", fontSize: 20 }}>
              {correctCount} / 3 Benar
            </span>
            <span style={{ color: "#94a3b8", fontSize: 14 }}>
              ({Math.round((correctCount / 3) * 100)}%)
            </span>
          </div>

          {/* 3 Questions Breakdown Review */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxWidth: 620,
              margin: "0 auto 36px",
              textAlign: "left",
            }}
          >
            {questions.map((q, qIndex) => {
              const userPick = userSelections[qIndex];
              const isQRight = userPick === q.correctIndex;
              return (
                <div
                  key={q.question}
                  style={{
                    background: "#24313d",
                    border: `1px solid ${isQRight ? "#04aa6d" : "#ef4444"}`,
                    borderRadius: 8,
                    padding: "16px 20px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 750, color: "#94a3b8" }}>
                      Soal {qIndex + 1}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 700,
                        color: isQRight ? "#04aa6d" : "#ef4444",
                      }}
                    >
                      {isQRight ? <Check style={{ width: 14, height: 14 }} /> : <X style={{ width: 14, height: 14 }} />}
                      {isQRight ? "Benar" : "Salah"}
                    </span>
                  </div>

                  <p style={{ margin: "0 0 8px", fontSize: 14.5, fontWeight: 600, color: "#ffffff" }}>
                    {q.question}
                  </p>

                  <div style={{ fontSize: 13, color: "#cbd5e1", lineHeight: 1.45 }}>
                    <strong>Jawaban Tepat:</strong> {q.options[q.correctIndex]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finish Actions */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleResetAll}
              style={{
                background: "#38444d",
                color: "#ffffff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 650,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "inherit",
              }}
            >
              <RotateCcw style={{ width: 16, height: 16 }} />
              <span>Ulangi Latihan</span>
            </button>

            <button
              type="button"
              onClick={handleGoToNextChapter}
              className="w3-docx-btn-green"
              style={{
                padding: "12px 32px",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 15,
                fontWeight: 750,
              }}
            >
              <span>{nextChapter ? `Lanjut ke ${nextChapter.name} >` : "Lanjut ke Modul Berikutnya >"}</span>
              <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </div>
        </div>
      )}

      {/* 6. Bottom Navigation Controls */}
      <div className="w3-docx-top-actions" style={{ marginTop: 24, marginBottom: 40 }}>
        <button
          type="button"
          onClick={() => onNavigate(chapterKey, chapterKey)}
          className="w3-docx-btn-outline"
        >
          &lt; Tutorial
        </button>
        <button
          type="button"
          onClick={handleGoToNextChapter}
          className="w3-docx-btn-green"
        >
          {nextChapter ? `Next: ${nextChapter.name} >` : "Next Chapter >"}
        </button>
      </div>
    </article>
  );
}
