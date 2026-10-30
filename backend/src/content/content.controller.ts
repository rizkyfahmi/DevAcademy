import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('api')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('courses')
  getAllCourses() {
    return this.contentService.getAllCourses();
  }

  @Get('courses/:slug')
  getCourseBySlug(@Param('slug') slug: string) {
    return this.contentService.getCourseBySlug(slug);
  }

  @Get('courses/:courseSlug/lessons/:lessonSlug')
  getLesson(
    @Param('courseSlug') courseSlug: string,
    @Param('lessonSlug') lessonSlug: string,
  ) {
    return this.contentService.getLesson(courseSlug, lessonSlug);
  }

  @Get('quizzes')
  getAllQuizzes() {
    return this.contentService.getAllQuizzes();
  }

  @Get('quizzes/:slug')
  getQuizBySlug(@Param('slug') slug: string) {
    return this.contentService.getQuizBySlug(slug);
  }

  @Get('exercises')
  getAllExercises() {
    return this.contentService.getAllExercises();
  }

  @Get('exercises/:slug')
  getExerciseBySlug(@Param('slug') slug: string) {
    return this.contentService.getExerciseBySlug(slug);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.contentService.searchContent(q);
  }

  @Get('sync')
  getUserSync(@Query('email') email: string) {
    return this.contentService.getUserSync(email);
  }

  @Post('sync')
  saveUserSync(
    @Body()
    body: {
      email: string;
      userId?: string;
      name?: string;
      avatarUrl?: string;
      state: Record<string, any>;
      overwrite?: boolean;
    },
  ) {
    return this.contentService.saveUserSync(body);
  }
}
