import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiAuthMiddleware } from './api-auth/api-auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          config: {
            client: 'mysql',
            useNullAsDefault: true,
            connection: {
              host: config.get('DB_HOST'),
              port: config.get('DB_PORT'),
              user: config.get('DB_USER'),
              password: config.get('DB_PASSWORD'),
              database: config.get('DB_DATABASE'),
            },
          },
        };
      },
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiAuthMiddleware).forRoutes('*');
  }
}
