import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-view-landlord',
	templateUrl: './view-landlord.component.html',
	styleUrls: ['./view-landlord.component.css']
})
export class ViewLandlordComponent implements OnInit {

	selectedLandlordData: any;

	availablePropertySummaryDatas: any;
	isPropertyLoading: boolean = true;

	constructor(private title: Title, private dataStorageService: DataStorageService, private dataProviderService: DataProviderService) {

		this.selectedLandlordData = dataStorageService.fetchCurrentLandlordData();

		if (!this.selectedLandlordData) {
			this.dataStorageService.redirectToLandlordList();
		}
		this.title.setTitle(`View Landlord (#${this.selectedLandlordData.landlordId}) - Vintage (Rental Management System)`);
	}

	ngOnInit(): void {
		this.populatePropertyDataList(this.selectedLandlordData.landlordId);
	}

	populatePropertyDataList(landlordId: number) {
		this.isPropertyLoading = true;
		this.dataProviderService.loadPropertySummaryDatas(landlordId).subscribe(
			data => {
				this.availablePropertySummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isPropertyLoading = false;
			});
	}

	onEditLandlordData(landlord: any) {
		this.dataStorageService.prepareLandlordDataForEdit(landlord);
	}

	onViewLandlordData(landlord: any) {
		this.dataStorageService.prepareLandlordDataForView(landlord);
	}

	onDeleteLandlordData(landlordId: number) {
		this.dataStorageService.prepareLandlordDataForDelete(landlordId);
	}

}
