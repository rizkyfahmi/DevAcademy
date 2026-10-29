import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course } from "@/lib/syntaxlab-data";

export function CourseRouteBand({ course, activeLessonSlug }: { course: Course; activeLessonSlug?: string }) {
  return <nav className="route-band" aria-label={"Urutan pelajaran " + course.title} style={{ "--route-count": course.lessons.length } as React.CSSProperties}>
    {course.lessons.map((lesson, index) => {
      const active = activeLessonSlug === lesson.slug;
      return <Link key={lesson.slug} href={"/learn/" + course.slug + "/" + lesson.slug} className={"route-stop" + (active ? " active" : "")} aria-current={active ? "step" : undefined}>
        <span className="route-number">{index + 1}</span><span>{lesson.title}{active ? <small>Pelajaran aktif</small> : null}</span><ArrowRight className="route-arrow" aria-hidden="true" />
      </Link>;
    })}
  </nav>;
}
