import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule, utilities } from 'nest-winston';
import { transports } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'silly',
      format: utilities.format.nestLike(),
      transports: [
        new transports.Console(),
        new transports.File({
          filename: 'logs.txt',
        }),
      ],
    }),
  });
  await app.listen(3000);
}
bootstrap();
