import Link from "next/link";
import { ArrowRight, BookOpen, Code2 } from "lucide-react";
import { SYNTAXLAB_COURSES } from "@/lib/syntaxlab-data";
import { CourseRouteBand } from "@/components/learning/CourseRouteBand";
export default function CourseClient({ courseSlug }: { courseSlug: string }) {
  const course = SYNTAXLAB_COURSES.find((item) => item.slug === courseSlug);
  if (!course) return null;
  const first = course.lessons[0];

  return (
    <div className="stack">
      <header className="page-head">
        <div>
          <span className="pill pill-yellow">{course.category}</span>
          <h1 style={{ marginTop: 10 }}>{course.title}</h1>
          <p>{course.description}</p>
        </div>
        <div className="page-actions">
          <Link className="primary-button" href={"/learn/" + course.slug + "/" + first.slug}>
            <BookOpen />Start Learning
          </Link>
          <Link className="secondary-button" href="/playground">
            <Code2 />Playground
          </Link>
        </div>
      </header>
      <section className="panel course-hero">
        <div>
          <div className="panel-head">
            <div>
              <h2>{course.title.replace(" Tutorial", "")} Track</h2>
              <p>Follow topics sequentially, or navigate directly to the specific chapter you need.</p>
            </div>
            <span className="pill">{course.lessons.length} lessons</span>
          </div>
          <CourseRouteBand course={course} />
        </div>
      </section>
      <section className="panel panel-pad">
        <div className="panel-head">
          <div>
            <h2>Course Modules</h2>
            <p>Clear explanations and interactive examples are available in every lesson.</p>
          </div>
        </div>
        <div className="course-list">
          {course.lessons.map((lesson, index) => (
            <Link className="course-row" key={lesson.slug} href={"/learn/" + course.slug + "/" + lesson.slug}>
              <span className="course-index">{index + 1}</span>
              <span>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </span>
              <ArrowRight className="course-row-arrow" />
            </Link>
          ))}
        </div>
      </section>
      <section className="content-grid">
        <Link href="/exercises" className="panel panel-pad">
          <h2 style={{ fontSize: 15 }}>Practice Exercises</h2>
          <p className="muted">Apply concepts from this tutorial to real hands-on problem sets.</p>
          <span className="text-button">
            View Exercises <ArrowRight />
          </span>
        </Link>
        <Link href="/playground" className="panel panel-pad">
          <h2 style={{ fontSize: 15 }}>Interactive Playground</h2>
          <p className="muted">Experiment and write code directly with live browser preview.</p>
          <span className="text-button">
            Open Playground <ArrowRight />
          </span>
        </Link>
      </section>
    </div>
  );
}
