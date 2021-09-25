import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-update-lease',
	templateUrl: './update-lease.component.html',
	styleUrls: ['./update-lease.component.css']
})
export class UpdateLeaseComponent implements OnInit {

	selectedLeaseData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService) {

		this.selectedLeaseData = dataStorageService.fetchCurrentLeaseData();

		if (!this.selectedLeaseData) {
			this.dataStorageService.redirectToActiveLeaseList();
		}
		this.title.setTitle('Update Lease - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}
}
