import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-update-landlord',
	templateUrl: './update-landlord.component.html',
	styleUrls: ['./update-landlord.component.css']
})
export class UpdateLandlordComponent implements OnInit {

	selectedLandlordData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService) {

		this.selectedLandlordData = dataStorageService.fetchCurrentLandlordData();

		if (!this.selectedLandlordData) {
			this.dataStorageService.redirectToLandlordList();
		}
		this.title.setTitle('Update Landlord - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}

}
