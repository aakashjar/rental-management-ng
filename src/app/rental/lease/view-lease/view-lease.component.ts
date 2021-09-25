import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-view-lease',
	templateUrl: './view-lease.component.html',
	styleUrls: ['./view-lease.component.css']
})
export class ViewLeaseComponent implements OnInit {

	selectedLeaseData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService) {

		this.selectedLeaseData = dataStorageService.fetchCurrentLeaseData();

		if (!this.selectedLeaseData) {
			this.dataStorageService.redirectToActiveLeaseList();
		}
		this.title.setTitle(`View Lease (#${this.selectedLeaseData.leaseId}) - Vintage (Rental Management System)`);
	}

	ngOnInit(): void {
		// This is intentional
	}

	onEditLeaseData(landlord: any) {
		this.dataStorageService.prepareLeaseDataForEdit(landlord);
	}

	onViewLeaseData(landlord: any) {
		this.dataStorageService.prepareLeaseDataForView(landlord);
	}

	onTerminateLeaseData(landlordId: number) {
		this.dataStorageService.prepareLeaseDataForTermination(landlordId);
	}
}
