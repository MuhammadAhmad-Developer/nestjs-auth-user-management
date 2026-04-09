import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  await app.listen(port);
  console.log(`🚀 Server running on http://127.0.0.1:${port}`);
}
bootstrap();
