import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-update-property',
	templateUrl: './update-property.component.html',
	styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent implements OnInit {

	selectedPropertyData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService) {

		this.selectedPropertyData = dataStorageService.fetchCurrentPropertyData();

		if (!this.selectedPropertyData) {
			this.dataStorageService.redirectToPropertyList();
		}
		this.title.setTitle('Update Property - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}
}
