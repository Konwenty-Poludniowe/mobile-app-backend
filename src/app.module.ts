import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { QueryBuilderService } from './query-builder/query-builder.service';
import { KnexModule } from 'nest-knexjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  controllers: [AppController, EventsController],
  providers: [AppService, EventsService, QueryBuilderService],
})
export class AppModule {}
