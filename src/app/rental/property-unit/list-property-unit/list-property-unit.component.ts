import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-property-unit',
	templateUrl: './list-property-unit.component.html',
	styleUrls: ['./list-property-unit.component.css']
})
export class ListPropertyUnitComponent implements OnInit {

	propertyUnitSummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('View Property Units - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populatePropertyUnitSummaryDataList();
	}

	populatePropertyUnitSummaryDataList() {
		this.isLoading = true;
		this.dataProviderService.loadPropertyUnitSummaryDatas().subscribe(
			data => {
				this.propertyUnitSummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLoading = false;
			});
	}

	onDeletePropertyUnitData(propertyUnitId: number) {
		if (confirm('Property Unit with ID: ' + propertyUnitId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deletePropertyUnitData(propertyUnitId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.populatePropertyUnitSummaryDataList();
				});
	}

	onEditPropertyUnitData(propertyUnit: any) {
		this.dataStorageService.preparePropertyUnitDataForEdit(propertyUnit);
	}

	onViewPropertyUnitData(propertyUnit: any) {
		this.dataStorageService.preparePropertyUnitDataForView(propertyUnit);
	}
}