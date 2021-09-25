import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-terminated-lease',
	templateUrl: './list-terminated-lease.component.html',
	styleUrls: ['./list-terminated-lease.component.css']
})
export class ListTerminatedLeaseComponent implements OnInit {

	leaseSummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('View Terminated Leases - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populateTerminatedLeaseSummaryDataList();
	}

	populateTerminatedLeaseSummaryDataList() {
		this.isLoading = true;
		this.dataProviderService.loadTerminatedLeaseSummaryDatas().subscribe(
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

	onDeleteLeaseData(leaseId: number) {
		if (confirm('Lease with ID: ' + leaseId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteLeaseData(leaseId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.populateTerminatedLeaseSummaryDataList();
				});
	}

	onEditLeaseData(lease: any) {
		this.dataStorageService.prepareLeaseDataForEdit(lease);
	}

	onViewLeaseData(lease: any) {
		this.dataStorageService.prepareLeaseDataForView(lease);
	}
}
