"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  getFullExerciseProgress,
  saveFullExerciseProgress,
  markChapterAsCompleted,
} from "@/lib/user-progress-store";
import Link from "next/link";
import { 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw
} from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { DarkFooter } from "@/components/landing/DarkFooter";
import { CourseExercisePack, ExerciseItemWithMeta } from "@/lib/w3-all-exercises";

interface DocxFullCourseExerciseViewProps {
  pack: CourseExercisePack;
}

export function DocxFullCourseExerciseView({ pack }: DocxFullCourseExerciseViewProps) {
  const { user } = useAuth();
  const packKey = (pack.slug || pack.techKey || "html").toLowerCase();

  const [currentNum, setCurrentNum] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [submittedMap, setSubmittedMap] = useState<Record<number, boolean>>({});
  const [selectedOptionMap, setSelectedOptionMap] = useState<Record<number, number | null>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [jumpInput, setJumpInput] = useState<string>("");
  const [jumpError, setJumpError] = useState<string>("");
  const [selectedChapterSlug, setSelectedChapterSlug] = useState<string>("all");
  const exerciseCardRef = useRef<HTMLDivElement>(null);

  const persistNow = useCallback(
    (
      nextNum: number,
      nextAnswers: Record<number, number>,
      nextSubmitted: Record<number, boolean>,
      nextSelectedOptions: Record<number, number | null>,
      nextChapSlug: string,
      overwrite = false
    ) => {
      const payload = {
        currentNum: nextNum,
        userAnswers: nextAnswers,
        submittedMap: nextSubmitted,
        selectedOptionMap: nextSelectedOptions,
        selectedChapterSlug: nextChapSlug,
        updatedAt: Date.now(),
      };
      saveFullExerciseProgress(user?.email, packKey, payload, user, overwrite);
      if (pack.techKey && pack.techKey.toLowerCase() !== packKey) {
        saveFullExerciseProgress(user?.email, pack.techKey.toLowerCase(), payload, user, overwrite);
      }
    },
    [user, packKey, pack.techKey]
  );

  // Hydrate saved state on mount & when user or packKey changes
  const hydrateFromStore = useCallback(() => {
    const saved =
      getFullExerciseProgress(user?.email, packKey) ||
      getFullExerciseProgress(user?.email, pack.techKey) ||
      getFullExerciseProgress(null, packKey);

    if (saved) {
      const restoredNum =
        typeof saved.currentNum === "number" &&
        saved.currentNum >= 1 &&
        saved.currentNum <= pack.questionsCount
          ? saved.currentNum
          : 1;
      const restoredAnswers = saved.userAnswers || {};
      const restoredSubmitted = saved.submittedMap || {};
      const restoredSelectedMap = saved.selectedOptionMap || {};
      const restoredChap = saved.selectedChapterSlug || "all";

      setCurrentNum(restoredNum);
      setUserAnswers(restoredAnswers);
      setSubmittedMap(restoredSubmitted);
      setSelectedOptionMap(restoredSelectedMap);
      setSelectedChapterSlug(restoredChap);

      const activeOpt =
        restoredSelectedMap[restoredNum] !== undefined && restoredSelectedMap[restoredNum] !== null
          ? restoredSelectedMap[restoredNum]
          : restoredAnswers[restoredNum] !== undefined
          ? restoredAnswers[restoredNum]
          : null;
      setSelectedOption(activeOpt);
    }
  }, [user?.email, packKey, pack.techKey, pack.questionsCount]);

  useEffect(() => {
    hydrateFromStore();
  }, [hydrateFromStore]);

  useEffect(() => {
    const handleCloudSync = () => {
      hydrateFromStore();
    };
    window.addEventListener("devacademy-cloud-synced", handleCloudSync);
    return () => window.removeEventListener("devacademy-cloud-synced", handleCloudSync);
  }, [hydrateFromStore]);

  const activeQuestion: ExerciseItemWithMeta = useMemo(() => {
    const found = pack.questions.find((q) => q.globalNumber === currentNum);
    return found || pack.questions[0];
  }, [pack.questions, currentNum]);

  // Statistics calculation
  const totalQuestions = pack.questionsCount;
  const answeredCount = Object.keys(submittedMap).filter((k) => submittedMap[Number(k)]).length;
  const correctCount = useMemo(() => {
    return Object.entries(userAnswers).filter(([numStr, ansIdx]) => {
      if (!submittedMap[Number(numStr)]) return false;
      const q = pack.questions.find((item) => item.globalNumber === Number(numStr));
      return q && ansIdx === q.correctIndex;
    }).length;
  }, [pack.questions, userAnswers, submittedMap]);

  const wrongCount = Math.max(0, answeredCount - correctCount);

  // Jump to specific question number
  const handleJumpToNumber = (targetNum: number, customChapSlug?: string) => {
    if (targetNum >= 1 && targetNum <= totalQuestions) {
      const nextOpt =
        selectedOptionMap[targetNum] !== undefined && selectedOptionMap[targetNum] !== null
          ? selectedOptionMap[targetNum]
          : userAnswers[targetNum] !== undefined
          ? userAnswers[targetNum]
          : null;
      setCurrentNum(targetNum);
      setSelectedOption(nextOpt);
      setJumpError("");
      setJumpInput("");
      persistNow(
        targetNum,
        userAnswers,
        submittedMap,
        selectedOptionMap,
        customChapSlug ?? selectedChapterSlug
      );
      if (exerciseCardRef.current) {
        exerciseCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      setJumpError(`Nomor soal harus antara 1 sampai ${totalQuestions}`);
    }
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(jumpInput.trim(), 10);
    if (!isNaN(parsed)) {
      handleJumpToNumber(parsed);
    } else {
      setJumpError("Masukkan angka nomor soal yang valid");
    }
  };

  // Jump to chapter start
  const handleChapterSelect = (slug: string) => {
    setSelectedChapterSlug(slug);
    if (slug === "all") {
      persistNow(currentNum, userAnswers, submittedMap, selectedOptionMap, "all");
      return;
    }
    const chap = pack.chapters.find((c) => c.slug === slug);
    if (chap) {
      handleJumpToNumber(chap.startIndex, slug);
    }
  };

  // Select Option (immediately saved even before clicking Submit!)
  const handleSelectOption = (optIdx: number) => {
    if (submittedMap[currentNum]) return;
    setSelectedOption(optIdx);
    const nextSelectedMap = { ...selectedOptionMap, [currentNum]: optIdx };
    setSelectedOptionMap(nextSelectedMap);
    persistNow(currentNum, userAnswers, submittedMap, nextSelectedMap, selectedChapterSlug);
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const nextAnswers = { ...userAnswers, [currentNum]: selectedOption };
    const nextSubmitted = { ...submittedMap, [currentNum]: true };
    const nextSelectedMap = { ...selectedOptionMap, [currentNum]: selectedOption };

    setUserAnswers(nextAnswers);
    setSubmittedMap(nextSubmitted);
    setSelectedOptionMap(nextSelectedMap);
    persistNow(currentNum, nextAnswers, nextSubmitted, nextSelectedMap, selectedChapterSlug);

    if (activeQuestion?.chapterSlug) {
      markChapterAsCompleted(user?.email, pack.techKey, activeQuestion.chapterSlug, user);
    }
  };

  // Reset answer for current question
  const handleResetCurrent = () => {
    const nextAnswers = { ...userAnswers };
    delete nextAnswers[currentNum];
    const nextSubmitted = { ...submittedMap };
    delete nextSubmitted[currentNum];
    const nextSelectedMap = { ...selectedOptionMap };
    delete nextSelectedMap[currentNum];

    setUserAnswers(nextAnswers);
    setSubmittedMap(nextSubmitted);
    setSelectedOptionMap(nextSelectedMap);
    setSelectedOption(null);
    persistNow(currentNum, nextAnswers, nextSubmitted, nextSelectedMap, selectedChapterSlug, true);
  };

  // Reset all answers
  const handleResetAll = () => {
    if (window.confirm(`Yakin ingin mereset seluruh progress latihan ${pack.techName}? Semua jawaban (${answeredCount} soal) akan dikosongkan.`)) {
      setUserAnswers({});
      setSubmittedMap({});
      setSelectedOptionMap({});
      setSelectedOption(null);
      setCurrentNum(1);
      persistNow(1, {}, {}, {}, "all", true);
    }
  };

  // Active question state
  const isSubmitted = !!submittedMap[currentNum];
  const isCorrect = isSubmitted && userAnswers[currentNum] === activeQuestion.correctIndex;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#1e293b", fontFamily: "inherit" }}>
      {/* 1. Top Navbar */}
      <LandingHeader activeTech={pack.techKey} />

      {/* 2. Top Sub-Bar (Breadcrumbs & Statistics) */}
      <div
        style={{
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          padding: "10px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          {/* Back button & Breadcrumbs */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link
              href="/exercises"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                color: "#04aa6d",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 700,
                background: "#e8f6ef",
                padding: "5px 12px",
                borderRadius: 6,
              }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} />
              <span>Semua Exercise</span>
            </Link>
            <span style={{ color: "#cbd5e1" }}>/</span>
            <span style={{ fontSize: 13.5, fontWeight: 750, color: "#0f172a" }}>
              {pack.techName} Exercises
            </span>
            <span
              style={{
                background: "#f1f5f9",
                color: "#475569",
                padding: "2px 8px",
                borderRadius: 12,
                fontSize: 11.5,
                fontWeight: 600,
              }}
            >
              {pack.chaptersCount} Materi · {pack.questionsCount} Soal
            </span>
          </div>

          {/* Quick Score Counter */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12.5, fontWeight: 700 }}>
            <span style={{ color: "#04aa6d" }}>✅ {correctCount} Benar</span>
            <span style={{ color: "#ef4444" }}>❌ {wrongCount} Salah</span>
            <span style={{ color: "#64748b" }}>
              Dijawab: {answeredCount} / {totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Body */}
      <main style={{ maxWidth: 720, margin: "24px auto 60px", padding: "0 16px" }}>
        
        {/* Title Section */}
        <div style={{ marginBottom: 18 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            {pack.techName} Exercises
          </h1>
          <p style={{ fontSize: 14.5, color: "#475569", margin: 0, lineHeight: 1.5 }}>
            Many chapters in this tutorial end with an exercise where you can check your level of knowledge.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BAGIAN 1: COMPACT DARK EXERCISE CARD                               */}
        {/* ------------------------------------------------------------------ */}
        <div
          ref={exerciseCardRef}
          className="w3-docx-exercise-dark-card"
          style={{
            background: "#282a35",
            borderRadius: 10,
            padding: "26px 22px",
            color: "#ffffff",
            margin: "0 0 18px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* Clean White Title: Exercise with ? icon (NO giant green pill) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              fontSize: 22,
              fontWeight: 750,
              color: "#ffffff",
              marginBottom: 6,
            }}
          >
            <span>Exercise</span>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#475569",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                display: "inline-grid",
                placeItems: "center",
              }}
              title="Pilih salah satu jawaban yang benar"
            >
              ?
            </span>
          </div>

          {/* Sub-soal Index & Chapter Indicator */}
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#94a3b8",
              marginBottom: 18,
            }}
          >
            Soal {activeQuestion.questionIndexInChapter + 1} dari 3 · Bab: <strong style={{ color: "#cbd5e1" }}>{activeQuestion.chapterName}</strong>
          </div>

          {/* Centered Question */}
          <h3
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: 700,
              color: "#f8fafc",
              margin: "0 0 24px",
              lineHeight: 1.5,
            }}
          >
            {activeQuestion.question}
          </h3>

          {/* Vertical Options List (Radio options with dark background & code) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              maxWidth: 620,
              margin: "0 auto 22px",
            }}
          >
            {activeQuestion.options.map((optText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isAnswerCorrect = activeQuestion.correctIndex === optIdx;
              const isUserChoice = userAnswers[currentNum] === optIdx;

              let optionBg = "#38444d";
              let optionBorder = "1px solid transparent";
              let bulletBg = "#ffffff";
              let bulletShadow = "none";

              if (isSelected && !isSubmitted) {
                optionBg = "#1e293b";
                optionBorder = "1px solid #04aa6d";
                bulletBg = "#04aa6d";
                bulletShadow = "0 0 0 3px rgba(4, 170, 109, 0.3)";
              }

              if (isSubmitted) {
                if (isAnswerCorrect) {
                  optionBg = "#04aa6d";
                  optionBorder = "1px solid #04aa6d";
                  bulletBg = "#ffffff";
                } else if (isUserChoice && !isAnswerCorrect) {
                  optionBg = "#dc2626";
                  optionBorder = "1px solid #dc2626";
                  bulletBg = "#ffffff";
                }
              }

              return (
                <label
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 18px",
                    borderRadius: 6,
                    background: optionBg,
                    border: optionBorder,
                    color: "#ffffff",
                    cursor: isSubmitted ? "default" : "pointer",
                    transition: "background 0.15s, border-color 0.15s",
                    userSelect: "none",
                  }}
                >
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: bulletBg,
                      boxShadow: bulletShadow,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <code
                    style={{
                      fontFamily: "Consolas, Menlo, Monaco, monospace",
                      fontSize: 14,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      lineHeight: 1.4,
                      color: "#ffffff",
                    }}
                  >
                    {optText}
                  </code>
                </label>
              );
            })}
          </div>

          {/* Centered Submit Answer » Button */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                style={{
                  background: "#04aa6d",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 6,
                  padding: "11px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: selectedOption === null ? "not-allowed" : "pointer",
                  opacity: selectedOption === null ? 0.6 : 1,
                  transition: "all 0.15s ease",
                }}
              >
                Submit Answer »
              </button>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                {currentNum < totalQuestions ? (
                  <button
                    type="button"
                    onClick={() => handleJumpToNumber(currentNum + 1)}
                    style={{
                      background: "#04aa6d",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: 6,
                      padding: "11px 26px",
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span>Soal Selanjutnya »</span>
                  </button>
                ) : (
                  <span style={{ color: "#4ade80", fontWeight: 700, fontSize: 14.5 }}>
                    🎉 Semua Soal Selesai Dikerjakan!
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleResetCurrent}
                  style={{
                    background: "transparent",
                    color: "#cbd5e1",
                    border: "1px solid #475569",
                    borderRadius: 6,
                    padding: "10px 18px",
                    fontSize: 13.5,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Coba Lagi
                </button>
              </div>
            )}
          </div>

          {/* Feedback Box (Shown after Submit) */}
          {isSubmitted && (
            <div
              style={{
                maxWidth: 620,
                margin: "18px auto 0",
                padding: "14px 18px",
                borderRadius: 6,
                fontSize: 14,
                lineHeight: 1.5,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                background: isCorrect ? "#064e3b" : "#7f1d1d",
                border: `1px solid ${isCorrect ? "#059669" : "#dc2626"}`,
                color: isCorrect ? "#a7f3d0" : "#fecaca",
              }}
            >
              {isCorrect ? (
                <>
                  <Check style={{ width: 18, height: 18, color: "#4ade80", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong>Correct!</strong> {activeQuestion.explanation}
                  </div>
                </>
              ) : (
                <>
                  <X style={{ width: 18, height: 18, color: "#f87171", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <strong>Not quite right!</strong> Jawaban yang benar adalah <code>{activeQuestion.options[activeQuestion.correctIndex]}</code>. {activeQuestion.explanation}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Green Action: See all {tech} Exercises (Matching screenshot) */}
        <div style={{ margin: "0 0 28px" }}>
          <Link
            href="/exercises"
            style={{
              display: "inline-block",
              background: "#04aa6d",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14.5,
              padding: "10px 22px",
              borderRadius: 6,
              transition: "background 0.15s ease",
            }}
          >
            See all {pack.techName} Exercises
          </Link>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BAGIAN 2: NOMOR SOAL DI BAWAH SOAL (SESUAI REQUEST USER)           */}
        {/* ------------------------------------------------------------------ */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 10,
            padding: "20px 24px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Header Row: Current Soal info & Chapter Filter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 15.5, fontWeight: 750, color: "#0f172a", marginBottom: 3 }}>
                Nomor Soal: <span style={{ color: "#04aa6d" }}>No. {currentNum}</span> dari {totalQuestions}
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>
                Bab: <strong>{activeQuestion.chapterName}</strong> · Sub-soal {activeQuestion.questionIndexInChapter + 1} dari 3
              </div>
            </div>

            {/* Jump & Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <select
                value={selectedChapterSlug}
                onChange={(e) => handleChapterSelect(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: "1.5px solid #cbd5e1",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#1e293b",
                  background: "#ffffff",
                  cursor: "pointer",
                }}
              >
                <option value="all">Semua Bab (1 - {totalQuestions})</option>
                {pack.chapters.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name} ({c.startIndex} - {c.endIndex})
                  </option>
                ))}
              </select>

              <form onSubmit={handleJumpSubmit} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  type="number"
                  min={1}
                  max={totalQuestions}
                  placeholder="No."
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  style={{
                    width: 60,
                    padding: "5px 8px",
                    borderRadius: 6,
                    border: "1.5px solid #cbd5e1",
                    fontSize: 12.5,
                    fontWeight: 700,
                    textAlign: "center",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#04aa6d",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Go
                </button>
              </form>
            </div>
          </div>

          {jumpError && (
            <p style={{ color: "#ef4444", fontSize: 12, margin: "0 0 10px", fontWeight: 600 }}>{jumpError}</p>
          )}

          {/* Number Pills Grid (1..N) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
              gap: 6,
              padding: "12px 0",
              borderTop: "1px dashed #e2e8f0",
              borderBottom: "1px dashed #e2e8f0",
              marginBottom: 16,
            }}
          >
            {pack.questions.map((q) => {
              const isCurrent = q.globalNumber === currentNum;
              const isDone = submittedMap[q.globalNumber];
              const isRight = isDone && userAnswers[q.globalNumber] === q.correctIndex;
              const isWrong = isDone && userAnswers[q.globalNumber] !== q.correctIndex;

              let bg = "#f8fafc";
              let color = "#475569";
              let border = "1px solid #cbd5e1";

              if (isCurrent) {
                border = "2.5px solid #04aa6d";
                if (!isDone) {
                  bg = "#e8f6ef";
                  color = "#04aa6d";
                }
              }

              if (isRight) {
                bg = "#04aa6d";
                color = "#ffffff";
                border = "1px solid #04aa6d";
              } else if (isWrong) {
                bg = "#ef4444";
                color = "#ffffff";
                border = "1px solid #ef4444";
              }

              return (
                <button
                  key={q.globalNumber}
                  type="button"
                  onClick={() => handleJumpToNumber(q.globalNumber)}
                  title={`Soal ${q.globalNumber}: ${q.chapterName}`}
                  style={{
                    height: 36,
                    borderRadius: 6,
                    background: bg,
                    color: color,
                    border: border,
                    fontSize: 13,
                    fontWeight: isCurrent || isDone ? 750 : 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                  }}
                >
                  {q.globalNumber}
                </button>
              );
            })}
          </div>

          {/* Bottom Bar: Prev / Next Navigation & Reset */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => handleJumpToNumber(currentNum - 1)}
                disabled={currentNum <= 1}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "1px solid #cbd5e1",
                  background: currentNum <= 1 ? "#f1f5f9" : "#ffffff",
                  color: currentNum <= 1 ? "#94a3b8" : "#1e293b",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: currentNum <= 1 ? "not-allowed" : "pointer",
                }}
              >
                <ArrowLeft style={{ width: 14, height: 14 }} />
                <span>« Soal Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={() => handleJumpToNumber(currentNum + 1)}
                disabled={currentNum >= totalQuestions}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 14px",
                  borderRadius: 6,
                  border: "1px solid #cbd5e1",
                  background: currentNum >= totalQuestions ? "#f1f5f9" : "#ffffff",
                  color: currentNum >= totalQuestions ? "#94a3b8" : "#1e293b",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: currentNum >= totalQuestions ? "not-allowed" : "pointer",
                }}
              >
                <span>Soal Selanjutnya »</span>
                <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetAll}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #fecaca",
                background: "#fef2f2",
                color: "#ef4444",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <RotateCcw style={{ width: 13, height: 13 }} />
              <span>Reset Semua Jawaban</span>
            </button>
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <DarkFooter />
    </div>
  );
}
