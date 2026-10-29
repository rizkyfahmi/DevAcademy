import { ALL_HTML_CHAPTERS, ChapterItem } from "./w3-html-chapters-data";
import { ALL_CSS_CHAPTERS } from "./w3-css-chapters-data";
import { ALL_JS_CHAPTERS } from "./w3-js-chapters-data";
import { ALL_PYTHON_CHAPTERS } from "./w3-python-chapters-data";
import { ALL_SQL_CHAPTERS } from "./w3-sql-chapters-data";
import { getOrCreateCourseMeta, normalizeTechKey, TECH_TO_SLUG_MAP, SLUG_TO_TECH_MAP } from "./w3-all-courses-catalog";
import { getThreeExercisesForChapter, ExerciseQuestion } from "./w3-three-exercises";

export interface ExerciseItemWithMeta {
  globalNumber: number; // 1-indexed (e.g. 1 to 90)
  chapterSlug: string;
  chapterName: string;
  questionIndexInChapter: number; // 0, 1, or 2
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChapterMetaInPack {
  name: string;
  slug: string;
  startIndex: number; // 1-based question number
  endIndex: number;
  count: number;
}

export interface CourseExercisePack {
  techKey: string;
  techName: string;
  slug: string;
  chaptersCount: number;
  questionsCount: number;
  chapters: ChapterMetaInPack[];
  questions: ExerciseItemWithMeta[];
}

export function getAllExercisesForCourse(techInput: string): CourseExercisePack {
  const norm = normalizeTechKey(techInput);
  const slug = TECH_TO_SLUG_MAP[norm] || techInput.toLowerCase();

  let rawChapters: ChapterItem[] = [];
  if (norm === "HTML") {
    rawChapters = ALL_HTML_CHAPTERS;
  } else if (norm === "CSS") {
    rawChapters = ALL_CSS_CHAPTERS;
  } else if (norm === "JAVASCRIPT") {
    rawChapters = ALL_JS_CHAPTERS;
  } else if (norm === "PYTHON") {
    rawChapters = ALL_PYTHON_CHAPTERS;
  } else if (norm === "SQL") {
    rawChapters = ALL_SQL_CHAPTERS;
  } else {
    rawChapters = getOrCreateCourseMeta(norm).sections.flatMap((s) => s.items);
  }

  // Filter out 'home' and reference-only items if present, keeping actual tutorial chapters
  const filteredChapters = rawChapters.filter(
    (c) => c.slug !== "home" && !c.slug.startsWith("ref-") && !c.slug.startsWith("audio-")
  );

  // If filtered list is too small, fallback to all raw chapters except 'home'
  const finalChapters = filteredChapters.length >= 3 
    ? filteredChapters 
    : rawChapters.filter((c) => c.slug !== "home");

  const questions: ExerciseItemWithMeta[] = [];
  const chaptersMeta: ChapterMetaInPack[] = [];

  let currentGlobalNumber = 1;

  for (const chap of finalChapters) {
    const rawThree = getThreeExercisesForChapter(norm, chap.slug, chap.name);
    const startIdx = currentGlobalNumber;

    rawThree.forEach((q, subIdx) => {
      // Deterministically rotate options so correct answers distribute naturally across A, B, C, D
      const shift = (currentGlobalNumber * 2 + 1) % q.options.length;
      const correctText = q.options[q.correctIndex];
      const newOptions = [...q.options];
      for (let s = 0; s < shift; s++) {
        const item = newOptions.shift()!;
        newOptions.push(item);
      }
      const newCorrectIndex = newOptions.indexOf(correctText);

      questions.push({
        globalNumber: currentGlobalNumber,
        chapterSlug: chap.slug,
        chapterName: chap.name,
        questionIndexInChapter: subIdx,
        question: q.question,
        options: newOptions,
        correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
        explanation: q.explanation,
      });

      currentGlobalNumber++;
    });

    chaptersMeta.push({
      name: chap.name,
      slug: chap.slug,
      startIndex: startIdx,
      endIndex: currentGlobalNumber - 1,
      count: rawThree.length,
    });
  }

  const techDisplayName = norm.charAt(0).toUpperCase() + norm.slice(1).toLowerCase();

  return {
    techKey: norm,
    techName: norm === "HTML" || norm === "CSS" || norm === "SQL" || norm === "DSA" || norm === "XML" 
      ? norm 
      : techDisplayName,
    slug,
    chaptersCount: finalChapters.length,
    questionsCount: questions.length,
    chapters: chaptersMeta,
    questions,
  };
}
