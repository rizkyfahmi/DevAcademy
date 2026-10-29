import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OpenAiModule } from './openai/openai.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    OpenAiModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
