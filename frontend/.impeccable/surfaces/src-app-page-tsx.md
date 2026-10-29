---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/layout.tsx","src/app/learn/[course]/[lesson]/page.tsx","src/app/playground/page.tsx","src/app/ai-tutor/page.tsx","src/app/exercises/page.tsx","src/app/quizzes/page.tsx"]
---

# SyntaxLab whole frontend

## Scope and visitor mode
Replace the visual system and page layouts across the existing frontend routes. This is a self-directed, read-and-operate learning product in Indonesian.

## Audience and job
A beginner chooses a course, follows a clear lesson sequence, reads a plain explanation, tries the code in the browser, and checks understanding with an exercise or quiz.

## Evidence and constraints
Use the existing course, lesson, quiz, exercise, glossary, and tutorial content plus current route and API contracts. Keep the NestJS backend untouched. Do not imply accounts, persisted learner progress, analytics, AI personalization, or unsupported completion data. Keep code execution sandboxed in an iframe.

## Chosen direction
Course Wayfinding Bands. Modern SaaS refinement: a tidy workspace with quiet neutral surfaces, clear typography, restrained borders, and one signal-yellow route marker. Course sequence and lesson position stay visible without crowding reading or code.

## Signature moment
Selecting a route stop opens that real lesson; the active stop becomes clear, and one action advances to the next available lesson.

## Direction contract
THESIS: Make the learner's current place and next useful lesson unmistakable. Refuse the generic catalog-first SaaS homepage that leaves the learning sequence implicit.

OWN-WORLD: A precise modern learning workspace with dark ink, clean light surfaces, small disciplined dividers, and one signal-yellow course band. Route markers use position, labels, and shape as well as color. Avoid travel data or decorative airport imitation.

STORY: A beginner sees a real course route, understands the current concept, and moves from explanation to runnable code or the next lesson without losing their place. Exercise and quiz links remain close to the course context.

FIRST VIEWPORT: A compact navigation rail names Belajar, Latihan, Playground, Glosarium, and AI Tutor. The main area opens on HTML and “Pengenalan HTML”; a horizontal route band lists the three actual HTML lessons and marks the current one. Below, a readable explanation sits beside the starter-code editor and sandboxed browser preview. “Coba contoh” leads into Playground; “Lanjutkan” opens the actual next lesson. CSS, JavaScript, and Python remain available as secondary course routes.

FORM: Course Wayfinding Bands, selected as the winning challenger from the second direction hand, seed ef795af7. This direction ranked above the assigned Logic-Grid Study Sheet on beginner recognition and course-route clarity; refine it with the user's later request for a modern, tidy SaaS finish. Build path: code-first.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
