import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'stockReconStatus'
})
export class StockReconciliationPipe implements PipeTransform {

	transform(variationWithinPermissibleLimit: string, duVariation?: number, index?: number): any {
		let finalClass: string;
		if (variationWithinPermissibleLimit == 'NO') {
			finalClass = duVariation < 0 ? 'fas fa-balance-scale-left fa-2x text-danger' : duVariation > 0 ? 'fas fa-balance-scale-right fa-2x text-danger' : 'fas fa-balance-scale fa-2x text-success';
		} else {
			finalClass = 'fas fa-balance-scale fa-2x text-success';
		}
		// finalClass += index % 2 == 1 ? ' text-ioc' : ' text-ioc-alt';
		return finalClass;
	}

}
