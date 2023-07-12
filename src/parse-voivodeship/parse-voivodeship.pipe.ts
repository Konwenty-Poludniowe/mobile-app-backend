import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseVoivodeshipPipe implements PipeTransform {
  transform(value: string) {
    if (typeof value == 'undefined' || value == null) return [];
    return value.split(',');
  }
}
