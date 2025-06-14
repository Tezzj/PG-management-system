import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true}));
  app.use(cookieParser());
  app.enableCors({
    origin: app.get(ConfigService).getOrThrow('FRONTEND_URL'),
    credentials: true,
  });
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
