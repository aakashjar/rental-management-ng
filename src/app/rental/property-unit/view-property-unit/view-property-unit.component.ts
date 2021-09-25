import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-view-property-unit',
	templateUrl: './view-property-unit.component.html',
	styleUrls: ['./view-property-unit.component.css']
})
export class ViewPropertyUnitComponent implements OnInit {

	selectedPropertyUnitData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService) {

		this.selectedPropertyUnitData = dataStorageService.fetchCurrentPropertyUnitData();

		if (!this.selectedPropertyUnitData) {
			this.dataStorageService.redirectToPropertyUnitList();
		}
		this.title.setTitle(`View Property Unit (#${this.selectedPropertyUnitData.propertyUnitId}) - Vintage (Rental Management System)`);
	}

	ngOnInit(): void {
		// This is intentional
	}

	onEditPropertyUnitData(propertyUnit: any) {
		this.dataStorageService.preparePropertyUnitDataForEdit(propertyUnit);
	}

	onViewPropertyUnitData(propertyUnit: any) {
		this.dataStorageService.preparePropertyUnitDataForView(propertyUnit);
	}

	onDeletePropertyUnitData(propertyUnitId: number) {
		this.dataStorageService.preparePropertyUnitDataForDelete(propertyUnitId);
	}
}
