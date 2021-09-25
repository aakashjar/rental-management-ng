import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-active-lease',
	templateUrl: './list-active-lease.component.html',
	styleUrls: ['./list-active-lease.component.css']
})
export class ListActiveLeaseComponent implements OnInit {

	leaseSummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('View Active Leases - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populateActiveLeaseSummaryDataList();
	}

	populateActiveLeaseSummaryDataList() {
		this.isLoading = true;
		this.dataProviderService.loadActiveLeaseSummaryDatas().subscribe(
			data => {
				this.leaseSummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLoading = false;
			});
	}

	onTerminateLeaseData(leaseId: number) {
		if (confirm('Lease with ID: ' + leaseId + ' will be terminated, Continue?'))
			this.dataProviderService.terminateLeaseData(leaseId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.populateActiveLeaseSummaryDataList();
				});
	}

	onEditLeaseData(lease: any) {
		this.dataStorageService.prepareLeaseDataForEdit(lease);
	}

	onViewLeaseData(lease: any) {
		this.dataStorageService.prepareLeaseDataForView(lease);
	}

}
