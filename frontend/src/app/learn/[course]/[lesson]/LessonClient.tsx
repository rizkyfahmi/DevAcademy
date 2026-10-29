"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Bot, CircleHelp, LoaderCircle, Send } from "lucide-react";
import { SYNTAXLAB_COURSES } from "@/lib/syntaxlab-data";
import { fetchApi } from "@/lib/api";
import { CourseRouteBand } from "@/components/learning/CourseRouteBand";
import { LessonContent } from "@/components/learning/LessonContent";
import { LessonCodeLab } from "@/components/learning/LessonCodeLab";

type AiResult={reply?:string;message?:string};
export default function LessonClient({courseSlug,lessonSlug}:{courseSlug:string;lessonSlug:string}){
 const course=SYNTAXLAB_COURSES.find((item)=>item.slug===courseSlug); const lesson=course?.lessons.find((item)=>item.slug===lessonSlug);
 const [aiOpen,setAiOpen]=useState(false); const [question,setQuestion]=useState(""); const [answer,setAnswer]=useState(""); const [aiError,setAiError]=useState(""); const [loading,setLoading]=useState(false);
 if(!course||!lesson)return null;
 const activeCourse=course; const activeLesson=lesson; const index=activeCourse.lessons.findIndex((item)=>item.slug===activeLesson.slug); const previous=activeCourse.lessons[index-1]; const next=activeCourse.lessons[index+1];
  async function askTutor(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    setAiError("");
    setAnswer("");
    try {
      const result = await fetchApi<AiResult>("/api/ai/chat", {
        method: "POST",
        body: JSON.stringify({
          prompt: question,
          context: "Tutorial: " + activeCourse.title + " — " + activeLesson.title + ". " + activeLesson.content,
        }),
      });
      setAnswer(result.reply ?? result.message ?? "Empty response from AI service.");
    } catch {
      setAiError("AI Tutor is currently unavailable. Please check the API connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <div className="small muted">
        <Link href="/dashboard">Dashboard</Link>
        <span> / </span>
        <Link href={"/learn/" + activeCourse.slug}>{activeCourse.title.replace(" Tutorial", "")}</Link>
        <span> / {activeLesson.title}</span>
      </div>
      <header className="page-head">
        <div>
          <span className="pill pill-yellow">
            {activeCourse.title.replace(" Tutorial", "")} · Step {index + 1} of {activeCourse.lessons.length}
          </span>
          <h1 style={{ marginTop: 10 }}>{activeLesson.title}</h1>
          <p>{activeLesson.description}</p>
        </div>
        <Link className="secondary-button" href={"/learn/" + activeCourse.slug}>
          <ArrowLeft />Modules List
        </Link>
      </header>
      <CourseRouteBand course={course} activeLessonSlug={activeLesson.slug} />
      <div className="lesson-layout">
        <article className="lesson-main panel panel-pad stack-sm">
          <div className="panel-head">
            <div>
              <h2>Understand Concepts</h2>
              <p>Concise explanation before you test live code examples.</p>
            </div>
            <span className="pill">{activeLesson.language.toUpperCase()}</span>
          </div>
          <LessonContent source={activeLesson.content} />
          <LessonCodeLab code={activeLesson.starterCode} language={activeLesson.language} title={activeLesson.title} />
          <div className="button-row" style={{ justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--line)" }}>
            {previous ? (
              <Link className="secondary-button" href={"/learn/" + activeCourse.slug + "/" + previous.slug}>
                <ArrowLeft />Previous
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="primary-button" href={"/learn/" + activeCourse.slug + "/" + next.slug}>
                Next <ArrowRight />
              </Link>
            ) : (
              <Link className="primary-button" href="/exercises">
                Practice Exercises <ArrowRight />
              </Link>
            )}
          </div>
        </article>
        <aside className="lesson-aside">
          <section className="panel panel-pad stack-sm">
            <div className="panel-head">
              <div>
                <h2>Lesson Roadmap</h2>
                <p>Current lesson and upcoming milestones.</p>
              </div>
            </div>
            <div className="course-list">
              {activeCourse.lessons.map((item, itemIndex) => (
                <Link key={item.slug} className="course-row" href={"/learn/" + activeCourse.slug + "/" + item.slug}>
                  <span
                    className="course-index"
                    style={item.slug === activeLesson.slug ? { background: "var(--accent)", borderColor: "var(--accent)" } : undefined}
                  >
                    {itemIndex + 1}
                  </span>
                  <span>
                    <h3>{item.title}</h3>
                    <p>{item.slug === activeLesson.slug ? "Currently learning" : item.description}</p>
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <section className="panel panel-pad stack-sm">
            <div className="panel-head">
              <div>
                <h2>Need further explanation?</h2>
                <p>Ask questions about concepts in this lesson.</p>
              </div>
              <Bot />
            </div>
            <button className="secondary-button" type="button" onClick={() => setAiOpen((value) => !value)}>
              {aiOpen ? "Close AI Tutor" : "Ask AI Tutor"}
            </button>
            {aiOpen ? (
              <form className="stack-sm" onSubmit={askTutor}>
                <label className="field">
                  <span>Question</span>
                  <textarea
                    className="textarea"
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Which concept would you like explained?"
                  />
                </label>
                <button className="primary-button" type="submit" disabled={loading || !question.trim()}>
                  {loading ? <LoaderCircle /> : <Send />}
                  {loading ? "Sending…" : "Send Question"}
                </button>
                {answer ? (
                  <div className="feedback info" role="status">
                    {answer}
                  </div>
                ) : null}
                {aiError ? (
                  <div className="feedback error" role="alert">
                    {aiError}
                  </div>
                ) : null}
              </form>
            ) : null}
          </section>
        </aside>
      </div>
    </div>
  );
}


