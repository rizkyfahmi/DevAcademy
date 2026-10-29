import { Suspense } from "react";
import { SYNTAXLAB_COURSES } from "@/lib/syntaxlab-data";
import { ALL_HTML_CHAPTERS } from "@/lib/w3-html-chapters-data";
import { ALL_CSS_CHAPTERS } from "@/lib/w3-css-chapters-data";
import { ALL_JS_CHAPTERS } from "@/lib/w3-js-chapters-data";
import { ALL_PYTHON_CHAPTERS } from "@/lib/w3-python-chapters-data";
import { ALL_SQL_CHAPTERS } from "@/lib/w3-sql-chapters-data";
import { ALL_COURSES_CATALOG, normalizeTechKey } from "@/lib/w3-all-courses-catalog";
import { DocxDashboardView } from "@/components/docx/DocxDashboardView";

export const instant = false;

export function generateStaticParams() {
  const syntaxlabParams = SYNTAXLAB_COURSES.flatMap((course) =>
    course.lessons.map((lesson) => ({
      course: course.slug,
      lesson: lesson.slug,
    }))
  );

  const htmlParams = ALL_HTML_CHAPTERS.map((item) => ({
    course: "html",
    lesson: item.slug,
  }));

  const cssParams = ALL_CSS_CHAPTERS.map((item) => ({
    course: "css",
    lesson: item.slug,
  }));

  const jsParams = ALL_JS_CHAPTERS.flatMap((item) => [
    { course: "javascript", lesson: item.slug },
    { course: "js", lesson: item.slug },
  ]);

  const pythonParams = ALL_PYTHON_CHAPTERS.map((item) => ({
    course: "python",
    lesson: item.slug,
  }));

  const sqlParams = ALL_SQL_CHAPTERS.map((item) => ({
    course: "sql",
    lesson: item.slug,
  }));

  const catalogParams = Object.values(ALL_COURSES_CATALOG).flatMap((meta) =>
    meta.sections.flatMap((s) =>
      s.items.map((item) => ({
        course: meta.slug,
        lesson: item.slug,
      }))
    )
  );

  return [...syntaxlabParams, ...htmlParams, ...cssParams, ...jsParams, ...pythonParams, ...sqlParams, ...catalogParams];
}

async function LessonContent({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course, lesson } = await params;
  const tech = normalizeTechKey(course);

  return <DocxDashboardView initialTech={tech} initialChapter={lesson} />;
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fbfdfc", color: "#64748b" }}>
          Memuat materi...
        </div>
      }
    >
      <LessonContent params={params} />
    </Suspense>
  );
}

