import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'retailAutomationStatus'
})
export class RetailAutomationStatusPipe implements PipeTransform {

  transform(transactionVariation: string, duVariation?: string, index?: number): any {
    let finalClass: string;
    if (transactionVariation == 'N' || duVariation == 'N') {
      finalClass = 'fas fa-balance-scale-left fa-2x text-danger';
    } else {
      finalClass = 'fas fa-balance-scale fa-2x text-success';
    }
    // finalClass += index % 2 == 1 ? ' text-ioc' : ' text-ioc-alt';
    return finalClass;
  }

}
