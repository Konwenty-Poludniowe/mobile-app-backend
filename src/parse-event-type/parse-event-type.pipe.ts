import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseEventTypePipe implements PipeTransform {
  transform(value: string) {
    if (typeof value == 'undefined' || value == null) return [];
    return value.split(',');
  }
}
