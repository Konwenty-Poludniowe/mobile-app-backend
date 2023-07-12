import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ParseEventTypePipe } from 'src/parse-event-type/parse-event-type.pipe';
import { ParseVoivodeshipPipe } from 'src/parse-voivodeship/parse-voivodeship.pipe';
import { EventsService } from './events.service';

@Controller('v1/events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get()
  public async getEvents(
    @Query('page', ParseIntPipe)
    page: number,
    @Query('event_type', ParseEventTypePipe)
    eventType?: string[],
    @Query('voivodeship', ParseVoivodeshipPipe)
    voivodeship?: string[],
    @Query('year')
    year?: string,
    @Query('yearSort')
    yearSort?: string,
    @Query('range')
    range?: string,
    @Query('latitude')
    latitude?: string,
    @Query('longitude')
    longitude?: string,
  ) {
    const events = await this.eventService.getEvents({
      page,
      eventType,
      voivodeship,
      year,
      yearSort,
      range: range ? parseInt(range) : null,
      latitude,
      longitude,
    });
    return events.map((event) => {
      const dateBegin = event.date_begin;
      const formattedDateBegin =
        `0${dateBegin.getDate()}`.slice(-2) +
        '-' +
        `0${dateBegin.getMonth() + 1}`.slice(-2) +
        '-' +
        dateBegin.getFullYear();
      const dateEnd = event.date_end;
      const formattedDateEnd =
        ('0' + dateEnd.getDate()).slice(-2) +
        '-' +
        ('0' + (dateEnd.getMonth() + 1)).slice(-2) +
        '-' +
        dateEnd.getFullYear();
      return {
        id: event.id,
        name: event.name,
        date_begin: formattedDateBegin,
        date_end: formattedDateEnd,
        event_type: event.event_type,
        location: event.location,
        address: event.address,
        price: event.price,
        description: event.description,
        www_url: event.www_url,
        fb_url: event.fb_url,
        event_url: event.event_url,
        review_url: event.review_url,
        img_url: `https://konwenty-poludniowe.pl/images/joodb/db1/img${event.id}-thumb.jpg`,
        participants: event.participants,
        voivodeship: event.voivodeship,
        lat: event.lat,
        long: event.long,
        cancelled: event.cancelled,
      };
    });
  }

  @Get('/:id')
  public async getEvent(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    const event = await this.eventService.getEvent(id);

    const dateBegin = event.date_begin;
    const formattedDateBegin =
      ('0' + dateBegin.getDate()).slice(-2) +
      '-' +
      ('0' + (dateBegin.getMonth() + 1)).slice(-2) +
      '-' +
      dateBegin.getFullYear();
    const dateEnd = event.date_end;
    const formattedDateEnd =
      ('0' + dateEnd.getDate()).slice(-2) +
      '-' +
      ('0' + (dateEnd.getMonth() + 1)).slice(-2) +
      '-' +
      dateEnd.getFullYear();

    return {
      id: event.id,
      name: event.name,
      date_begin: formattedDateBegin,
      date_end: formattedDateEnd,
      event_type: event.event_type,
      location: event.location,
      address: event.address,
      price: event.price,
      description: event.description,
      www_url: event.www_url,
      fb_url: event.fb_url,
      event_url: event.event_url,
      review_url: event.review_url,
      img_url: `https://konwenty-poludniowe.pl/images/joodb/db1/img${event.id}-thumb.jpg`,
      participants: event.participants,
      voivodeship: event.voivodeship,
      lat: event.lat,
      long: event.long,
      cancelled: event.cancelled,
    };
  }
}
