import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textlength'
})
export class TextlengthPipe implements PipeTransform {

  transform(value: string, maxlength: number): string {
    if (value.length > maxlength) {
      return value.slice(0, maxlength) + '...';
    }
    return value;
  }

}
