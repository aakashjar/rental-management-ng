import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/_shared/model/api-response.model';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';

@Component({
	selector: 'vintage-landlord-form',
	templateUrl: './landlord-form.component.html',
	styleUrls: ['./landlord-form.component.css']
})
export class LandlordFormComponent implements OnInit {

	@Input() landlordData: any;
	@Input() formSubject: string = "";
	@Input() action: string = "";

	landlordInfoForm: FormGroup = new FormGroup({});

	buttonDisable: boolean = false;
	submitted: boolean = false;
	isLoading: boolean = false;

	constructor(private dataProviderService: DataProviderService) {
	}

	ngOnInit(): void {
		this.onResetForm();
	}

	onResetForm() {
		this.landlordInfoForm = new FormGroup({
			'landlordId': new FormControl(this.landlordData?.landlordId),
			'landlordFullName': new FormControl(this.landlordData?.landlordFullName, Validators.required),
			'landlordEmailAddress': new FormControl(this.landlordData?.landlordEmailAddress, [Validators.required, Validators.email]),
			'landlordMobileNumber': new FormControl(this.landlordData?.landlordMobileNumber, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
			'landlordIdentityNumber': new FormControl(this.landlordData?.landlordIdentityNumber, Validators.required),
			'landlordAddress': new FormControl(this.landlordData?.landlordAddress, Validators.required),
			'landlordBankName': new FormControl(this.landlordData?.landlordBankName, Validators.required),
			'landlordBankIfsc': new FormControl(this.landlordData?.landlordBankIfsc, Validators.required),
			'landlordBankAccountNumber': new FormControl(this.landlordData?.landlordBankAccountNumber, Validators.required),
			'landlordEmergencyContactName': new FormControl(this.landlordData?.landlordEmergencyContactName),
			'landlordEmergencyContactMobileNumber': new FormControl(this.landlordData?.landlordEmergencyContactMobileNumber, [Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)])
		});
	}

	get f() {
		return this.landlordInfoForm.controls;
	}

	onSaveLandlordData() {

		this.submitted = true;

		if (this.landlordInfoForm.invalid) {
			this.buttonDisable = false;
			alert('Please fill in all the details before submitting!');
			return;
		}

		this.buttonDisable = true;

		let observable: Observable<ApiResponse>;

		if (this.action === 'register') {
			observable = this.dataProviderService.submitLandlordData(this.landlordInfoForm.value)
		} else {
			observable = this.dataProviderService.updateLandlordData(this.landlordInfoForm.value)
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

	onResetLandlordForm(): void {
		this.landlordInfoForm.reset();
		this.submitted = false;
	}
}
