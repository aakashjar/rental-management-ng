import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/_shared/model/api-response.model';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';

@Component({
	selector: 'vintage-inventory-form',
	templateUrl: './inventory-form.component.html',
	styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit {

	@Input() inventoryData: any;
	@Input() formSubject: string = "";
	@Input() action: string = "";

	inventoryInfoForm: FormGroup = new FormGroup({});

	availablePropertyDatas: any = [];
	availablePropertyUnitDatas: any = [];

	buttonDisable: boolean = false;
	submitted: boolean = false;
	isLoading: boolean = false;

	constructor(private dataProviderService: DataProviderService) {
	}

	ngOnInit(): void {
		this.populatePropertyDatas();
		if (this.inventoryData?.propertyId)
			this.populatePropertyUnitDatas(this.inventoryData?.propertyId)
		this.onResetForm();
	}

	populatePropertyDatas(): void {
		this.dataProviderService.loadPropertyDatas().subscribe(
			data => {
				this.availablePropertyDatas = data;
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
			},
			error => {
				console.error(error);
			},
			() => {
				// This is intentional.
			});
	}

	onResetForm() {
		this.inventoryInfoForm = new FormGroup({
			'inventoryId': new FormControl(this.inventoryData?.inventoryId),
			'propertyId': new FormControl(this.inventoryData?.propertyId ? this.inventoryData?.propertyId : '', Validators.required),
			'propertyUnitId': new FormControl(this.inventoryData?.propertyUnitId ? this.inventoryData?.propertyUnitId : ''),
			'inventoryDescription': new FormControl(this.inventoryData?.inventoryDescription, Validators.required),
		});

		this.f['propertyId'].valueChanges.subscribe(data => {
			if (data) {
				this.populatePropertyUnitDatas(data);
			}
		});
	}

	get f() {
		return this.inventoryInfoForm.controls;
	}

	onSaveInventoryData() {

		this.submitted = true;

		console.log(this.inventoryInfoForm);


		if (this.inventoryInfoForm.invalid) {
			this.buttonDisable = false;
			alert('Please fill in all the details before submitting!');
			return;
		}

		this.buttonDisable = true;

		let observable: Observable<ApiResponse>;

		if (this.action === 'register') {
			observable = this.dataProviderService.submitInventoryData(this.inventoryInfoForm.value)
		} else {
			observable = this.dataProviderService.updateInventoryData(this.inventoryInfoForm.value)
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

	onResetInventoryForm(): void {
		this.inventoryInfoForm.reset();
		this.submitted = false;
	}
}
