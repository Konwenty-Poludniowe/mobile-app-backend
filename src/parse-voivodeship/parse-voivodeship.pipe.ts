import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseVoivodeshipPipe implements PipeTransform {
  transform(value: string) {
    return value.split(',');
  }
}
