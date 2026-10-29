import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Controller('api/ai')
export class OpenAiController {
  constructor(private readonly openaiService: OpenAiService) {}

  @Get('health')
  checkHealth() {
    return {
      status: 'ok',
      service: 'DevAcademy OpenAI API Integration',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('chat')
  async chat(@Body() body: { prompt: string; context?: string; userId?: string }) {
    return this.openaiService.generateChat(body.prompt, body.context, body.userId);
  }

  @Post('explain')
  async explain(@Body() body: { code: string; language?: string; userId?: string }) {
    return this.openaiService.explainCode(body.code, body.language, body.userId);
  }

  @Post('hint')
  async hint(
    @Body() body: { exerciseTitle: string; instructions: string; currentCode: string; userId?: string },
  ) {
    return this.openaiService.generateHint(body.exerciseTitle, body.instructions, body.currentCode, body.userId);
  }

  @Post('debug')
  async debug(@Body() body: { code: string; errorMsg?: string; userId?: string }) {
    return this.openaiService.debugCode(body.code, body.errorMsg, body.userId);
  }
}
