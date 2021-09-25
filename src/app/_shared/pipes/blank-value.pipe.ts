import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'blankValue'
})
export class BlankValuePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value != undefined) {
      return value;
    } else {
      return '(Not Updated in RDB Facility)';
    }
  }

}
