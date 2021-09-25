import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-property',
	templateUrl: './list-property.component.html',
	styleUrls: ['./list-property.component.css']
})
export class ListPropertyComponent implements OnInit {

	propertySummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('View Properties - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populatePropertyDataList();
	}

	populatePropertyDataList() {
		this.isLoading = true;
		this.dataProviderService.loadPropertySummaryDatas().subscribe(
			data => {
				this.propertySummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLoading = false;
			});
	}

	onDeletePropertyData(propertyId: number) {
		if (confirm('Property with ID: ' + propertyId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deletePropertyData(propertyId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.populatePropertyDataList();
				});
	}

	onEditPropertyData(property: any) {
		this.dataStorageService.preparePropertyDataForEdit(property);
	}

	onViewPropertyData(property: any) {
		this.dataStorageService.preparePropertyDataForView(property);
	}
}