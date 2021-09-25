import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'vintage-view-invoice',
	templateUrl: './view-invoice.component.html',
	styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

	assetUrl: string;
	windowTitle: string;

	selectedInvoiceSummaryData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService, private dataProviderService: DataProviderService) {

		this.assetUrl = environment.assetUrl;

		this.selectedInvoiceSummaryData = dataStorageService.fetchCurrentInvoiceSummaryData();

		if (!this.selectedInvoiceSummaryData) {
			this.dataStorageService.redirectToInvoiceSummaryList();
		}
		this.windowTitle = `View Invoice (#${this.selectedInvoiceSummaryData.invoiceId}) - Vintage (Rental Management System)`;
		this.title.setTitle(this.windowTitle);
	}

	ngOnInit(): void {
		// This is intentional
	}

	onPayInvoice() {
		if (confirm('Are you sure you want to pay this invoice?')) {
			this.dataProviderService.payInvoice(this.selectedInvoiceSummaryData.invoiceId).subscribe(
				data => {
					alert(data.message);
				},
				error => {
					console.error(error);
				},
				() => {
					this.dataStorageService.redirectToInvoiceSummaryList();
				});
		}
	}

}
