import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-invoice-month',
	templateUrl: './list-invoice-month.component.html',
	styleUrls: ['./list-invoice-month.component.css']
})
export class ListInvoiceMonthComponent implements OnInit {

	invoiceMonthSummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('List Invoices by month - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populateInvoiceMonthDataList();
	}

	populateInvoiceMonthDataList() {
		this.isLoading = true;
		this.dataProviderService.loadInvoiceMonthSummaryDatas().subscribe(
			data => {
				this.invoiceMonthSummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLoading = false;
			});
	}

	onDeleteInvoiceData(invoiceId: number) {
		if (confirm('Invoice with ID: ' + invoiceId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteInvoiceData(invoiceId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.populateInvoiceMonthDataList();
				});
	}

	onViewInvoiceDatas(invoice: any) {
		this.dataStorageService.prepareInvoiceSummaryDataForView(invoice);
	}

}
