import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'occupancyStatusColorCode'
})
export class OccupancyStatusColorCodePipe implements PipeTransform {

	transform(value: any, args?: any): any {

		switch (value) {
			case "Vacant":
				return 'badge badge-success'
			case "Occupied":
				return 'badge badge-danger'
			case "Partially Occupied":
				return 'badge badge-warning'
			case "Unavailable":
				return 'badge badge-secondary'
			default:
				break;
		}

	}

}
