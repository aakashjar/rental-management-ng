import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../model/api-response.model';
import { DataProviderService } from '../../../service/data-provider.service';

@Component({
	selector: 'vintage-tenant-form',
	templateUrl: './tenant-form.component.html',
	styleUrls: ['./tenant-form.component.css']
})
export class TenantFormComponent implements OnInit {

	@Input() tenantData: any;
	@Input() formSubject: string = "";
	@Input() action: string = "";

	tenantInfoForm: FormGroup = new FormGroup({});

	buttonDisable: boolean = false;
	submitted: boolean = false;
	isLoading: boolean = false;

	constructor(private dataProviderService: DataProviderService) {
	}

	ngOnInit(): void {
		this.onResetForm();
	}

	onResetForm() {
		this.tenantInfoForm = new FormGroup({
			'tenantId': new FormControl(this.tenantData?.tenantId),
			'tenantFullName': new FormControl(this.tenantData?.tenantFullName, Validators.required),
			'tenantEmailAddress': new FormControl(this.tenantData?.tenantEmailAddress, [Validators.required, Validators.email]),
			'tenantMobileNumber': new FormControl(this.tenantData?.tenantMobileNumber, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
			'tenantIdentityNumber': new FormControl(this.tenantData?.tenantIdentityNumber, Validators.required),
			'tenantAddress': new FormControl(this.tenantData?.tenantAddress, Validators.required),
			'tenantOccupationStatus': new FormControl(this.tenantData?.tenantOccupationStatus ? this.tenantData?.tenantOccupationStatus : '', Validators.required),
			'tenantOccupationPlace': new FormControl(this.tenantData?.tenantOccupationPlace),
			'tenantEmergencyContactName': new FormControl(this.tenantData?.tenantEmergencyContactName),
			'tenantEmergencyContactMobileNumber': new FormControl(this.tenantData?.tenantEmergencyContactMobileNumber, [Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)])
		});
	}

	get f() {
		return this.tenantInfoForm.controls;
	}

	onSaveTenantData() {

		this.submitted = true;

		if (this.tenantInfoForm.invalid) {
			this.buttonDisable = false;
			alert('Please fill in all the details before submitting!');
			return;
		}

		this.buttonDisable = true;

		let observable: Observable<ApiResponse>;

		if (this.action === 'register') {
			observable = this.dataProviderService.submitTenantData(this.tenantInfoForm.value)
		} else {
			observable = this.dataProviderService.updateTenantData(this.tenantInfoForm.value)
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
			});
	}
}
