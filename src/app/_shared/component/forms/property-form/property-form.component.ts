import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/_shared/model/api-response.model';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';

@Component({
	selector: 'vintage-property-form',
	templateUrl: './property-form.component.html',
	styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {

	@Input() propertyData: any;
	@Input() formSubject: string = "";
	@Input() action: string = "";

	propertyInfoForm: FormGroup = new FormGroup({});

	availableLandlordDatas: any = [];

	buttonDisable: boolean = false;
	submitted: boolean = false;
	isLoading: boolean = false;

	constructor(private dataProviderService: DataProviderService) {
	}

	ngOnInit(): void {
		this.populateLandlordDatas();
		this.onResetForm();
	}

	populateLandlordDatas(): void {
		this.dataProviderService.loadLandlordDatas().subscribe(
			data => {
				this.availableLandlordDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				// This is intentional.
			}
		);
	}

	onResetForm(): void {
		this.propertyInfoForm = new FormGroup({
			'propertyId': new FormControl(this.propertyData?.propertyId),
			'landlordId': new FormControl(this.propertyData?.landlordId ? this.propertyData?.landlordId : '', Validators.required),
			'propertyName': new FormControl(this.propertyData?.propertyName, Validators.required),
			'propertyRent': new FormControl(this.propertyData?.propertyRent, [Validators.required, Validators.min(0)]),
			'propertyType': new FormControl(this.propertyData?.propertyType ? this.propertyData?.propertyType : '', Validators.required),
			'propertyArea': new FormControl(this.propertyData?.propertyArea, [Validators.required, Validators.min(0)]),
			'propertyAgencyCommission': new FormControl(this.propertyData?.propertyAgencyCommission, [Validators.required, Validators.min(0)]),
			'propertyDeposit': new FormControl(this.propertyData?.propertyDeposit, [Validators.required, Validators.min(0)]),
			'propertyDescription': new FormControl(this.propertyData?.propertyDescription, Validators.required),
			'propertyAddress': new FormControl(this.propertyData?.propertyAddress, Validators.required),
			'propertyCity': new FormControl(this.propertyData?.propertyCity, Validators.required),
			'propertyState': new FormControl(this.propertyData?.propertyState, Validators.required),
			'propertyPincode': new FormControl(this.propertyData?.propertyPincode, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(6)]),
			'propertyNotes': new FormControl(this.propertyData?.propertyNotes, Validators.required),
			'propertyAge': new FormControl(this.propertyData?.propertyAge ? this.propertyData?.propertyAge : '', Validators.required),
			'propertyRooms': new FormControl(this.propertyData?.propertyRooms ? this.propertyData?.propertyRooms : '', Validators.required),
			'propertyBedrooms': new FormControl(this.propertyData?.propertyBedrooms ? this.propertyData?.propertyBedrooms : '', Validators.required),
			'propertyBathrooms': new FormControl(this.propertyData?.propertyBathrooms ? this.propertyData?.propertyBathrooms : '', Validators.required),
			'propertyHasAirConditioner': new FormControl(this.propertyData?.propertyHasAirConditioner, Validators.requiredTrue),
			'propertyHasCarParking': new FormControl(this.propertyData?.propertyHasCarParking),
			'propertyHasLaundryRoom': new FormControl(this.propertyData?.propertyHasLaundryRoom),
			'propertyHasHeating': new FormControl(this.propertyData?.propertyHasHeating),
			'propertyHasBalcony': new FormControl(this.propertyData?.propertyHasBalcony),
			'propertyHasGym': new FormControl(this.propertyData?.propertyHasGym),
			'propertyHasInternet': new FormControl(this.propertyData?.propertyHasInternet),
			'propertyHasGarden': new FormControl(this.propertyData?.propertyHasGarden),
			'propertyHasAntiTheftAlarm': new FormControl(this.propertyData?.propertyHasAntiTheftAlarm),
			'propertyHasSwimmingPool': new FormControl(this.propertyData?.propertyHasSwimmingPool, Validators.requiredTrue),
			'propertyHasPetsAllowed': new FormControl(this.propertyData?.propertyHasPetsAllowed),
			'propertyHasCctvCameras': new FormControl(this.propertyData?.propertyHasCctvCameras)
		});
	}

	get f() {
		return this.propertyInfoForm.controls;
	}

	onSavePropertyData(): void {

		this.submitted = true;

		if (this.propertyInfoForm.invalid) {
			this.buttonDisable = false;
			alert('Please fill in all the details before submitting!');
			return;
		}

		this.buttonDisable = true;

		let observable: Observable<ApiResponse>;

		if (this.action === 'register') {
			observable = this.dataProviderService.submitPropertyData(this.propertyInfoForm.value)
		} else {
			observable = this.dataProviderService.updatePropertyData(this.propertyInfoForm.value)
		}

		observable.subscribe(
			data => {
				alert(data.message);
			},
			error => {
				console.error(error);
			},
			() => {
				this.buttonDisable = false;
				this.submitted = false;
			});
	}

	onResetPropertyForm(): void {
		this.propertyInfoForm.reset();
		this.submitted = false;
	}
}
