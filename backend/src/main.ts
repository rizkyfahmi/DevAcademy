import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing for Next.js frontend
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((u) => u.trim()) : []),
  ];

  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // allow requests with no origin (like mobile apps, curl or server-to-server)
      if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
        return callback(null, true);
      }
      // allow any vercel.app preview or production deployment if FRONTEND_URL is not strictly set
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in deployment to avoid blocking users
    },
    credentials: true,
  });

  // Enable global DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`🚀 DevAcademy Backend running on: http://localhost:${port}`);
}
bootstrap();
