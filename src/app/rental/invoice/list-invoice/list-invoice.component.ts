import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-invoice',
	templateUrl: './list-invoice.component.html',
	styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

	invoiceSummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('List Invoices - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populateInvoiceSummaryDataList();
	}

	populateInvoiceSummaryDataList() {
		this.isLoading = true;
		this.dataProviderService.loadInvoiceSummaryDatas().subscribe(
			data => {
				this.invoiceSummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLoading = false;
			});
	}

	onViewInvoiceData(invoice: any) {
		this.dataStorageService.prepareInvoiceSummaryDataForView(invoice);
	}
}
