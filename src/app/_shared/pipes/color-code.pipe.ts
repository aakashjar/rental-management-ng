import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'colorCode'
})
export class ColorCodePipe implements PipeTransform {

	transform(value: any, args?: any): any {

		if (!value) {
			return 'text-danger';
		} else {
			return 'text-ioc';
		}
	}

}
