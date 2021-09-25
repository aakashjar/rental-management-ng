import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'nameInitials'
})
export class NameInitialsPipe implements PipeTransform {

	transform(value: string, args?: any): any {

		if (value) {
			let initials: string = '';

			const name: string[] = value.split(' ');

			name.forEach(data => {
				initials += data.charAt(0);
			})
			return initials;
		}
	}

}
