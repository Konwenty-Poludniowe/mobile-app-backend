import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseEventTypePipe implements PipeTransform {
  transform(value: string) {
    return value.split(',');
  }
}
