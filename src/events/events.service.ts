import { Injectable } from '@nestjs/common';
import { GetEventsOptions } from './get-events.options';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class EventsService {
  constructor(@InjectConnection() private client: Knex) {}

  public async getEvent(eventId: number) {
    return await this.client('six69_joodb_events')
      .select('*')
      .where('id', eventId)
      .first();
  }

  public async getEvents(options: GetEventsOptions) {
    const queryBuilder = this.client('six69_joodb_events').select('*');
    if (options.eventType && options.eventType.length > 0) {
      queryBuilder.whereIn('event_type', options.eventType);
    }

    if (options.voivodeship && options.voivodeship.length > 0) {
      queryBuilder.whereIn('voivodeship', options.voivodeship);
    }

    if (
      options.range &&
      options.range < 100 &&
      options.latitude &&
      options.longitude
    ) {
      queryBuilder
        .with(
          'distance',
          this.client.raw(
            `select *, ROUND(ST_Distance_Sphere(ST_GeomFromText('POINT(${options.longitude} ${options.latitude})'), ST_GeomFromText(CONCAT('POINT(', \`long\`, ' ', lat, ')'))) / 1000) as distance from six69_joodb_events`,
          ),
        )
        .from('distance')
        .having('distance', '<=', options.range);
    }

    if (options.year && options.yearSort) {
      const dateFrom = new Date();
      dateFrom.setFullYear(parseInt(options.year));
      dateFrom.setMonth(1);
      dateFrom.setDate(0);
      const dateTo = new Date();
      dateTo.setFullYear(parseInt(options.year));
      if (new Date().getFullYear() != parseInt(options.year)) {
        dateTo.setMonth(11);
      }
      queryBuilder
        .whereBetween('date_begin', [
          dateFrom.toISOString().split('T')[0],
          dateTo.toISOString().split('T')[0],
        ])
        .orderBy('date_begin', options.yearSort);
    } else {
      queryBuilder
        .where('date_begin', '>=', new Date().toISOString().split('T')[0])
        .orderBy('date_begin', 'asc');
    }

    if (options.page != null || typeof options.page != 'undefined')
      queryBuilder.limit(20).offset((options.page - 1) * 20);

    return await queryBuilder;
  }
}
