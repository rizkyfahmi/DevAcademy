import { Suspense } from "react";
import { SYNTAXLAB_COURSES } from "@/lib/syntaxlab-data";
import { DocxDashboardView } from "@/components/docx/DocxDashboardView";
import { TECH_TO_SLUG_MAP, normalizeTechKey } from "@/lib/w3-all-courses-catalog";

export const instant = false;

export function generateStaticParams() {
  const allCatalogCourses = Object.values(TECH_TO_SLUG_MAP).map((slug) => ({ course: slug }));
  const syntaxlabParams = SYNTAXLAB_COURSES.map((course) => ({ course: course.slug }));
  
  // Merge and deduplicate
  const courseSet = new Set<string>();
  const allParams: { course: string }[] = [];
  for (const item of [...allCatalogCourses, ...syntaxlabParams]) {
    if (!courseSet.has(item.course)) {
      courseSet.add(item.course);
      allParams.push(item);
    }
  }
  return allParams;
}

async function CourseContent({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course } = await params;
  const tech = normalizeTechKey(course);

  return <DocxDashboardView initialTech={tech} initialChapter="home" />;
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fbfdfc", color: "#64748b" }}>
          Memuat materi kursus...
        </div>
      }
    >
      <CourseContent params={params} />
    </Suspense>
  );
}


