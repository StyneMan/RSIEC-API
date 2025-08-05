/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '10mb' }));
  app.enableCors();
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3010);
}
void bootstrap();
