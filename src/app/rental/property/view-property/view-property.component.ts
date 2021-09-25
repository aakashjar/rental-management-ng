import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-view-property',
	templateUrl: './view-property.component.html',
	styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {

	selectedPropertyData: any;
	availableLandlordDatas: any;
	currentLandlordData: any;
	availablePropertyUnitSummaryDatas: any = [];

	buttonDisable: boolean = false;
	submitted: boolean = false;
	isLandlordLoading: boolean = false;
	isPropertyUnitLoading: boolean = false;

	propertyOwnershipTransferForm: FormGroup = new FormGroup({});

	constructor(private title: Title, private dataStorageService: DataStorageService, private dataProviderService: DataProviderService) {

		this.selectedPropertyData = dataStorageService.fetchCurrentPropertyData();

		if (!this.selectedPropertyData) {
			this.dataStorageService.redirectToPropertyList();
		}
		this.title.setTitle(`View Property (#${this.selectedPropertyData.propertyId}) - Vintage (Rental Management System)`);
	}

	ngOnInit(): void {
		this.populateLandlordData(this.selectedPropertyData.landlordId);
		this.populatePropertyUnitSummaryDatas(this.selectedPropertyData.propertyId);
		this.populateLandlordDatas();
		this.onResetForm();
	}

	onEditPropertyData(property: any) {
		this.dataStorageService.preparePropertyDataForEdit(property);
	}

	onDeletePropertyData(propertyId: number) {
		this.dataStorageService.preparePropertyDataForDelete(propertyId);
	}

	populateLandlordData(landlordId: number): void {
		this.dataProviderService.loadLandlordData(landlordId).subscribe(
			data => {
				this.currentLandlordData = data;
			},
			error => {
				console.error(error);
			},
			() => {
				// This is intentional.
			});
	}

	populateLandlordDatas(): void {
		this.isLandlordLoading = true;
		this.dataProviderService.loadLandlordDatas().subscribe(
			data => {
				this.availableLandlordDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLandlordLoading = false;
			});
	}

	populatePropertyUnitSummaryDatas(propertyId: number): void {
		this.isPropertyUnitLoading = true;
		this.dataProviderService.loadPropertyUnitSummaryDatas(propertyId).subscribe(
			data => {
				this.availablePropertyUnitSummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isPropertyUnitLoading = false;
			});
	}

	onResetForm() {
		this.propertyOwnershipTransferForm = new FormGroup({
			'propertyId': new FormControl(this.selectedPropertyData.propertyId, Validators.required),
			'landlordId': new FormControl('', Validators.required)
		});
	}

	get f() {
		return this.propertyOwnershipTransferForm.controls;
	}

	onTransferOwnershipOfProperty(): void {

		this.submitted = true;

		if (this.propertyOwnershipTransferForm.invalid) {
			this.buttonDisable = false;
			alert('Please fill in all the details before submitting!');
			return;
		}

		this.buttonDisable = true;

		if (confirm('Property ownership will be transferred to the selected person, Continue?'))
			this.dataProviderService.updatePropertyOwnershipData(this.propertyOwnershipTransferForm.value).subscribe(
				data => {
					alert(data.message);
				},
				error => {
					console.error(error);
				},
				() => {
					this.populateLandlordData(this.propertyOwnershipTransferForm.value.landlordId);
					this.onResetForm();
					this.buttonDisable = false;
					this.submitted = false;
				});
	}

}
