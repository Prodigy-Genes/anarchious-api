import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This is the "Bouncer" for your API
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips away any properties not in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra properties are sent
      transform: true, // Automatically converts types (e.g., string to number)
    }),
  );

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
