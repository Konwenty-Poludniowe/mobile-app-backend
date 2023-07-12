import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule, utilities } from 'nest-winston';
import { transports } from 'winston';
import { GlobalExceptionFilter } from './global-exception.filter';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    level: 'silly',
    format: utilities.format.nestLike(),
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'logs.txt',
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  await app.listen(3000);
}
bootstrap();
