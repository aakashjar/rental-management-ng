import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-update-property-unit',
	templateUrl: './update-property-unit.component.html',
	styleUrls: ['./update-property-unit.component.css']
})
export class UpdatePropertyUnitComponent implements OnInit {

	selectedPropertyUnitData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService) {

		this.selectedPropertyUnitData = dataStorageService.fetchCurrentPropertyUnitData();

		if (!this.selectedPropertyUnitData) {
			this.dataStorageService.redirectToPropertyList();
		}
		this.title.setTitle('Update Property Unit - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}
}
