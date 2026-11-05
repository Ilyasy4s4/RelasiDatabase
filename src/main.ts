import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ 
    whitelist: true,
     forbidNonWhitelisted: true,
     transform: true,
     transformOptions: {
      enableImplicitConversion: true,
    }
  })
  );

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
