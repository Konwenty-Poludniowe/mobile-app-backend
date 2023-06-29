export interface GetEventsOptions {
  page: number;
  eventType?: string[];
  voivodeship?: string[];
  latitude?: string;
  longitude?: string;
  year?: string;
  yearSort?: string;
  range?: number;
}
