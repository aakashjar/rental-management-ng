import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'paymentStatusColorCode'
})
export class PaymentStatusColorCodePipe implements PipeTransform {

	transform(value: any, args?: any): any {

		switch (value) {
			case "P":
				return 'badge badge-success'
			case "U":
				return 'badge badge-danger'
			default:
				break;
		}

	}

}
