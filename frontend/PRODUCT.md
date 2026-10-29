# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Primary users are beginners learning programming independently. They need a clear sequence of topics, plain-language explanations, examples they can run or modify, and low-friction practice.

## Product Purpose
SyntaxLab is an Indonesian-language platform for learning programming through tutorials, references, interactive code examples, exercises, quizzes, and a browser playground. Success means a learner can understand a concept and apply it in code without leaving the learning flow.

## Positioning
**Inferred from the supplied platform specification:** connect each learning concept to code a beginner can immediately try, then reinforce it with a small exercise or quiz. This is a product direction inferred from the feature mix, not a confirmed market claim.

## Operating Context
Self-directed learning on desktop, tablet, or phone. A learner browses a course, reads a lesson, tries code in a sandboxed playground, and checks understanding through exercises or quizzes.

## Capabilities and Constraints
- Confirmed by `syntaxlab-platform-spec.md`: homepage, tutorials and search, course and lesson routes, playground, exercises, quizzes, glossary, help, about, dashboard, and AI tutor concepts.
- Current implementation stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Lucide React; retain the separate NestJS backend and its current API contracts.
- Preserve existing course, lesson, quiz, and exercise content where accurate and reusable.
- The AI Tutor must use the existing server API; do not expose provider credentials in the browser.
- The playground must execute learner code only in a sandboxed iframe.
- Accounts, persisted progress, admin content management, AI personalization, and other phase-two/future capabilities are not confirmed as operational; present no invented capability or outcome as fact.

## Brand Commitments
The user chose a modern SaaS visual direction. Product name is SyntaxLab (working name per the project spec); preserve the Indonesian UI voice and do not copy another learning platform's branding or content.

## Evidence on Hand
- Product/features source: `syntaxlab-platform-spec.md`.
- Course and learning data: `frontend/src/lib/syntaxlab-data.ts`.
- Existing backend route definitions under `backend/src/content` and `backend/src/openai`.
- No verified testimonials, customer metrics, institutional endorsements, or external performance claims; do not invent them.

## Product Principles
1. Keep the next learning action obvious.
2. Connect explanation with runnable code and practice.
3. Use concrete Indonesian explanations that respect beginners.
4. Keep future or nonpersistent capabilities honest.
5. Preserve keyboard access, responsive behavior, and safe code execution.
