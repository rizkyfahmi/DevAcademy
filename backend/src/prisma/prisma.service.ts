import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ [PrismaService] Connected to PostgreSQL database');
    } catch (error) {
      console.warn('⚠️ [PrismaService] Database connection delayed or offline. Make sure PostgreSQL is running.');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
