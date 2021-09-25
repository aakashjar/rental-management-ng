import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-landlord',
	templateUrl: './list-landlord.component.html',
	styleUrls: ['./list-landlord.component.css']
})
export class ListLandlordComponent implements OnInit {

	landlordSummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('View Landlords - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populateLandlordSummaryDataList();
	}

	populateLandlordSummaryDataList() {
		this.isLoading = true;
		this.dataProviderService.loadLandlordSummaryDatas().subscribe(
			data => {
				this.landlordSummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLoading = false;
			});
	}

	onDeleteLandlordData(landlordId: number) {
		if (confirm('Landlord with ID: ' + landlordId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteLandlordData(landlordId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.populateLandlordSummaryDataList();
				});
	}

	onEditLandlordData(landlord: any) {
		this.dataStorageService.prepareLandlordDataForEdit(landlord);
	}

	onViewLandlordData(landlord: any) {
		this.dataStorageService.prepareLandlordDataForView(landlord);
	}
}
