import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'salesStatus'
})
export class SalesStatusPipe implements PipeTransform {

  transform(value: number, previous: number): string {
    if (value > previous) {
      return 'text-success';
    } else if (value < previous) {
      return 'text-danger';
    }
  }
}
