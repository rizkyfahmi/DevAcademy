import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OpenAiService {
  private readonly logger = new Logger(OpenAiService.name);
  private openai: OpenAI | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (apiKey && apiKey !== 'your_openai_api_key_here' && apiKey.startsWith('sk-')) {
      this.openai = new OpenAI({ apiKey });
      this.logger.log('OpenAI Client initialized successfully.');
    } else {
      this.logger.warn('OPENAI_API_KEY is not set or placeholder. Running in rich demo mode.');
    }
  }

  async generateChat(prompt: string, context?: string, userId?: string) {
    const systemPrompt = `You are DevAcademy AI Tutor, a friendly, concise, and educational programming assistant. Provide brief, to-the-point explanations with clean code examples when relevant. ${
      context ? `Current lesson context: ${context}` : ''
    }`;

    return this.executeOpenAi(prompt, systemPrompt, 'chat', userId);
  }

  async explainCode(code: string, language: string = 'html/css/javascript', userId?: string) {
    const prompt = `Please explain the following ${language} code step-by-step in a beginner-friendly way:\n\`\`\`${language}\n${code}\n\`\`\``;
    const systemPrompt = 'You are a Code Explainer specialist at DevAcademy. Break down key lines, their purpose, and the resulting output.';

    return this.executeOpenAi(prompt, systemPrompt, 'explain', userId);
  }

  async generateHint(exerciseTitle: string, instructions: string, currentCode: string, userId?: string) {
    const prompt = `Exercise: "${exerciseTitle}".\nInstructions: "${instructions}".\nUser's current code:\n\`\`\`\n${currentCode}\n\`\`\`\n\nProvide 1 small HINT to help me solve this WITHOUT directly spoiling the full solution code.`;
    const systemPrompt = 'You are a guiding programming instructor at DevAcademy. Provide helpful hints that stimulate the learner\'s problem-solving skills without revealing the final answer.';

    return this.executeOpenAi(prompt, systemPrompt, 'hint', userId);
  }

  async debugCode(code: string, errorMsg?: string, userId?: string) {
    const prompt = `Code with issue:\n\`\`\`\n${code}\n\`\`\`\n${errorMsg ? `Error message: ${errorMsg}\n` : ''}\nHelp identify the bug and explain how to fix it cleanly.`;
    const systemPrompt = 'You are a Debugging Assistant at DevAcademy. Analyze syntax or logical errors, and provide clear explanations and clean fixes.';

    return this.executeOpenAi(prompt, systemPrompt, 'debug', userId);
  }

  private async executeOpenAi(prompt: string, systemPrompt: string, mode: string, userId?: string) {
    if (!this.openai) {
      let demoResponse = '';
      if (mode === 'explain') {
        demoResponse = `[DevAcademy AI Explainer (Demo)]:\nThis code demonstrates standard web structure. Key elements render interactive UI components. Set OPENAI_API_KEY in backend/.env for real-time in-depth explanations from GPT-4o!`;
      } else if (mode === 'hint') {
        demoResponse = `[DevAcademy AI Hint (Demo)]:\n💡 Hint: Check your opening and closing tags, and ensure attribute names and values match the exercise instructions.`;
      } else if (mode === 'debug') {
        demoResponse = `[DevAcademy AI Debugger (Demo)]:\n🔍 Quick Analysis: No fatal syntax errors detected. Ensure all variables are properly declared before usage.`;
      } else {
        demoResponse = `[DevAcademy AI Tutor (Demo)]:\nHello! I am your DevAcademy learning assistant. The NestJS backend is ready to receive your queries. To enable live AI model responses, add your API key in backend/.env!`;
      }

      // Log to Prisma if db is running
      try {
        await this.prisma.aiChatLog.create({
          data: {
            prompt,
            response: demoResponse,
            mode,
            model: 'demo-mode',
            userId: userId || null,
          },
        });
      } catch {}

      return {
        reply: demoResponse,
        mode,
        model: 'demo-mode',
      };
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
      });

      const reply = completion.choices[0]?.message?.content || 'No response from AI.';
      const tokensUsed = completion.usage?.total_tokens || 0;

      try {
        await this.prisma.aiChatLog.create({
          data: {
            prompt,
            response: reply,
            mode,
            model: completion.model,
            tokensUsed,
            userId: userId || null,
          },
        });
      } catch (err) {
        this.logger.warn(`Could not save AI log to database: ${err.message}`);
      }

      return {
        reply,
        mode,
        model: completion.model,
        usage: completion.usage,
      };
    } catch (error) {
      this.logger.error(`OpenAI Request failed: ${error.message}`);
      throw error;
    }
  }
}
