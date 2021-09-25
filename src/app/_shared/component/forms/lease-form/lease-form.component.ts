import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/_shared/model/api-response.model';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { PresentFutureDateValidator } from 'src/app/_shared/validators/present-future-date.validator';

@Component({
	selector: 'vintage-lease-form',
	templateUrl: './lease-form.component.html',
	styleUrls: ['./lease-form.component.css']
})
export class LeaseFormComponent implements OnInit {

	@Input() leaseData: any;
	@Input() formSubject: string = "";
	@Input() action: string = "";

	leaseInfoForm: FormGroup = new FormGroup({});

	availablePropertyDatas: any = [];
	availablePropertyDatasMap: Map<number, any> = new Map();

	availablePropertyUnitDatas: any = [];
	availablePropertyUnitDatasMap: Map<number, any> = new Map();

	availableTenantDatas: any = [];
	availableTenantDatasMap: Map<number, any> = new Map();

	showPropertyUnitField: boolean = false;

	buttonDisable: boolean = false;
	submitted: boolean = false;
	isLoading: boolean = false;

	constructor(private dataProviderService: DataProviderService) {
	}

	ngOnInit(): void {
		this.populatePropertyDatas();
		this.populateTenantDatas();
		this.onResetForm();
	}

	populatePropertyDatas(): void {
		this.dataProviderService.loadPropertyDatas().subscribe(
			data => {
				this.availablePropertyDatas = data;
				this.availablePropertyDatas.forEach((availablePropertyData: any) => {
					this.availablePropertyDatasMap.set(availablePropertyData.propertyId, availablePropertyData);
				});
			},
			error => {
				console.error(error);
			},
			() => {
				// This is intentional.
			});
	}

	populatePropertyUnitDatas(propertyId: number): void {
		this.dataProviderService.loadPropertyUnitsFromProperty(propertyId).subscribe(
			data => {
				this.availablePropertyUnitDatas = data;
				this.availablePropertyUnitDatas.forEach((availablePropertyUnitData: any) => {
					this.availablePropertyUnitDatasMap.set(availablePropertyUnitData.propertyUnitId, availablePropertyUnitData);
				});
			},
			error => {
				console.error(error);
			},
			() => {
				// This is intentional.
			});
	}

	populateTenantDatas(): void {
		this.dataProviderService.loadTenantDatas().subscribe(
			data => {
				this.availableTenantDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.availableTenantDatas.forEach((availableTenantData: any) => {
					this.availableTenantDatasMap.set(availableTenantData.tenantId, availableTenantData);
				});
			});
	}

	populateDepositAndRent(deposit: number, rent: number): void {
		this.f['leaseDepositPaid'].setValue(deposit);
		this.f['leaseRent'].setValue(rent);
	}

	resetPropertyUnit(): void {
		this.f['propertyUnitId'].setValidators(null);
		this.f['propertyUnitId'].reset('');
	}

	resetDepositAndRent(): void {
		this.f['leaseDepositPaid'].reset();
		this.f['leaseRent'].reset();
	}

	onResetForm(): void {
		this.leaseInfoForm = new FormGroup({
			'leaseId': new FormControl(this.leaseData?.leaseId),
			'propertyId': new FormControl(this.leaseData?.propertyId ? this.leaseData?.propertyId : '', Validators.required),
			'leaseUnits': new FormControl(this.leaseData?.propertyUnitId > 0 ? true : false),
			'propertyUnitId': new FormControl(this.leaseData?.propertyUnitId ? this.leaseData?.propertyUnitId : ''),
			'tenantId': new FormControl(this.leaseData?.tenantId ? this.leaseData?.tenantId : '', Validators.required),
			'tenantMobileNumber': new FormControl({ value: '', disabled: true }),
			'leaseDepositPaid': new FormControl({ value: this.leaseData?.leaseDepositPaid, disabled: true }, [Validators.required, Validators.min(0)]),
			'leaseRent': new FormControl({ value: this.leaseData?.leaseRent, disabled: true }, [Validators.required, Validators.min(0)]),
			'leaseStartDate': new FormControl(this.leaseData?.leaseStartDate, [Validators.required, PresentFutureDateValidator]),
			'leaseEndDate': new FormControl({ value: this.leaseData?.leaseEndDate, disabled: true }),
			'leaseTerms': new FormControl(this.leaseData?.leaseTerms, Validators.required)
		});

		this.f['propertyId'].valueChanges.subscribe(data => {
			if (data) {
				this.populateDepositAndRent(Number(this.availablePropertyDatasMap.get(Number(data))?.propertyDeposit), Number(this.availablePropertyDatasMap.get(Number(data))?.propertyRent));
				this.populatePropertyUnitDatas(data);
			}
		});

		this.f['propertyUnitId'].valueChanges.subscribe(data => {
			if (data) {
				this.populateDepositAndRent(Number(this.availablePropertyUnitDatasMap.get(Number(data))?.propertyUnitDeposit), Number(this.availablePropertyUnitDatasMap.get(Number(data))?.propertyUnitRent));
			}
		});

		this.f['leaseUnits'].valueChanges.subscribe((data: boolean) => {
			this.togglePropertyUnitField(data);
		});

		this.f['tenantId'].valueChanges.subscribe(data => {
			if (data) {
				this.f['tenantMobileNumber'].setValue(this.availableTenantDatasMap.get(Number(data))?.tenantMobileNumber);
			}
		});

		this.f['leaseStartDate'].valueChanges.subscribe(data => {
			if (data) {
				this.f['leaseEndDate'].setValue(dayjs(data, 'YYYY-MM-DD', true).add(11, 'month').format('YYYY-MM-DD'));
			}
		});
	}

	get f() {
		return this.leaseInfoForm.controls;
	}

	togglePropertyUnitField(value: boolean): void {
		this.showPropertyUnitField = value;
		if (this.showPropertyUnitField) {
			this.f['propertyUnitId'].setValidators(Validators.required);
			this.resetPropertyUnit();
			this.resetDepositAndRent();
			this.leaseInfoForm.updateValueAndValidity();
		} else {
			this.resetPropertyUnit();
			this.populateDepositAndRent(Number(this.availablePropertyDatasMap.get(Number(this.f['propertyId'].value))?.propertyDeposit),
				Number(this.availablePropertyDatasMap.get(Number(this.f['propertyId'].value))?.propertyRent));
			this.leaseInfoForm.updateValueAndValidity();
		}
	}

	onSaveLeaseData() {

		this.submitted = true;

		if (this.leaseInfoForm.invalid) {
			this.buttonDisable = false;
			alert('Please fill in all the details before submitting!');
			return;
		}

		this.buttonDisable = true;

		let observable: Observable<ApiResponse>;

		if (this.action === 'register') {
			observable = this.dataProviderService.submitLeaseData(this.leaseInfoForm.value)
		} else {
			observable = this.dataProviderService.updateLeaseData(this.leaseInfoForm.value)
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

	onResetLeaseForm(): void {
		this.leaseInfoForm.reset({ propertyId: '', propertyUnitId: '', tenantId: '' });
		this.submitted = false;
	}

}
