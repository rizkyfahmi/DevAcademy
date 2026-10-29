import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExercisesForCourse } from "@/lib/w3-all-exercises";
import { DocxFullCourseExerciseView } from "@/components/docx/DocxFullCourseExerciseView";
import { TECH_TO_SLUG_MAP } from "@/lib/w3-all-courses-catalog";

interface ExerciseCoursePageProps {
  params: Promise<{ tech: string }>;
}

export function generateStaticParams() {
  const slugs = [
    "html",
    "css",
    "javascript",
    "js",
    "sql",
    "python",
    "java",
    "php",
    "c",
    "cpp",
    "csharp",
    "react",
    "mysql",
    "nodejs",
    "typescript",
    "git",
    "bootstrap",
    "jquery",
    "excel",
    "dsa",
    "django",
    "numpy",
    "pandas",
    "mongodb",
    "go",
    "rust",
    "kotlin",
    "xml",
    ...Object.values(TECH_TO_SLUG_MAP),
  ];

  // Unique slugs
  const unique = Array.from(new Set(slugs.map((s) => s.toLowerCase())));
  return unique.map((slug) => ({ tech: slug }));
}

export async function generateMetadata({ params }: ExerciseCoursePageProps): Promise<Metadata> {
  const { tech } = await params;
  const pack = getAllExercisesForCourse(tech);

  return {
    title: `${pack.techName} Exercises — ${pack.questionsCount} Soal Latihan Lengkap | DevAcademy`,
    description: `Kerjakan seluruh ${pack.questionsCount} soal latihan materi ${pack.techName} di DevAcademy. Pilih nomor soal bebas dan uji pemahaman codingmu.`,
  };
}

async function ExerciseCourseContent({ params }: ExerciseCoursePageProps) {
  const { tech } = await params;
  const pack = getAllExercisesForCourse(tech);

  if (!pack || pack.questionsCount === 0) {
    notFound();
  }

  return <DocxFullCourseExerciseView pack={pack} />;
}

export default function ExerciseCoursePage({ params }: ExerciseCoursePageProps) {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#111827", color: "#9ca3af" }}>
          Memuat latihan soal lengkap...
        </div>
      }
    >
      <ExerciseCourseContent params={params} />
    </Suspense>
  );
}
