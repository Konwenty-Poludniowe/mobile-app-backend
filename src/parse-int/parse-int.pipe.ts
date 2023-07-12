import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    if (typeof value == 'undefined' || value == null) null;
    return parseInt(value);
  }
}
