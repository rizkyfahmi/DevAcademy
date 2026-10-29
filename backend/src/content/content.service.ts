import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  SYNTAXLAB_COURSES,
  SYNTAXLAB_QUIZZES,
  SYNTAXLAB_EXERCISES,
  CourseData,
  LessonData,
  QuizData,
  ExerciseData,
} from './content.data';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCourses(): Promise<Omit<CourseData, 'lessons'>[]> {
    return SYNTAXLAB_COURSES.map((course) => ({
      slug: course.slug,
      title: course.title,
      description: course.description,
      category: course.category,
      icon: course.icon,
      badge: course.badge,
      lessonsCount: course.lessons.length,
    }));
  }

  async getCourseBySlug(slug: string): Promise<CourseData> {
    const course = SYNTAXLAB_COURSES.find((c) => c.slug === slug);
    if (!course) {
      throw new NotFoundException(`Course '${slug}' not found`);
    }
    return course;
  }

  async getLesson(courseSlug: string, lessonSlug: string): Promise<{
    lesson: LessonData;
    course: { slug: string; title: string };
    prevLesson: { slug: string; title: string } | null;
    nextLesson: { slug: string; title: string } | null;
  }> {
    const course = await this.getCourseBySlug(courseSlug);
    const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
    if (index === -1) {
      throw new NotFoundException(`Lesson '${lessonSlug}' not found in course '${courseSlug}'`);
    }

    const lesson = course.lessons[index];
    const prevLesson = index > 0 ? { slug: course.lessons[index - 1].slug, title: course.lessons[index - 1].title } : null;
    const nextLesson = index < course.lessons.length - 1 ? { slug: course.lessons[index + 1].slug, title: course.lessons[index + 1].title } : null;

    return {
      lesson,
      course: { slug: course.slug, title: course.title },
      prevLesson,
      nextLesson,
    };
  }

  async getAllQuizzes(): Promise<Omit<QuizData, 'questions'>[]> {
    return SYNTAXLAB_QUIZZES.map((q) => ({
      slug: q.slug,
      title: q.title,
      courseSlug: q.courseSlug,
    }));
  }

  async getQuizBySlug(slug: string): Promise<QuizData> {
    const quiz = SYNTAXLAB_QUIZZES.find((q) => q.slug === slug);
    if (!quiz) {
      throw new NotFoundException(`Quiz '${slug}' not found`);
    }
    return quiz;
  }

  async getAllExercises(): Promise<ExerciseData[]> {
    return SYNTAXLAB_EXERCISES;
  }

  async getExerciseBySlug(slug: string): Promise<ExerciseData> {
    const exercise = SYNTAXLAB_EXERCISES.find((e) => e.slug === slug);
    if (!exercise) {
      throw new NotFoundException(`Exercise '${slug}' not found`);
    }
    return exercise;
  }

  async searchContent(query: string) {
    if (!query || query.trim() === '') return { results: [] };
    const q = query.toLowerCase();

    const matchedCourses = SYNTAXLAB_COURSES.filter(
      (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    ).map((c) => ({
      type: 'course',
      title: c.title,
      description: c.description,
      url: `/learn/${c.slug}`,
    }));

    const matchedLessons: Array<{ type: string; title: string; description: string; url: string }> = [];
    for (const course of SYNTAXLAB_COURSES) {
      for (const lesson of course.lessons) {
        if (lesson.title.toLowerCase().includes(q) || lesson.description.toLowerCase().includes(q) || lesson.content.toLowerCase().includes(q)) {
          matchedLessons.push({
            type: 'lesson',
            title: `${course.title}: ${lesson.title}`,
            description: lesson.description,
            url: `/learn/${course.slug}/${lesson.slug}`,
          });
        }
      }
    }

    return {
      query,
      results: [...matchedCourses, ...matchedLessons],
    };
  }
}
