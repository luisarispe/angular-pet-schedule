import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstTitleUpper',
})
export class FirstTitleUpperPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  }
}
