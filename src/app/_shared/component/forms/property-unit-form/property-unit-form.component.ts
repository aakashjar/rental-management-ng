import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/_shared/model/api-response.model';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';

@Component({
  selector: 'vintage-property-unit-form',
  templateUrl: './property-unit-form.component.html',
  styleUrls: ['./property-unit-form.component.css']
})
export class PropertyUnitFormComponent implements OnInit {

  @Input() propertyUnitData: any;
  @Input() formSubject: string = "";
  @Input() action: string = "";

  propertyUnitInfoForm: FormGroup = new FormGroup({});

  availablePropertyDatas: any = [];
  availablePropertyUnitDatas: any = [];

  buttonDisable: boolean = false;
  submitted: boolean = false;
  isLoading: boolean = false;

  constructor(private dataProviderService: DataProviderService) {
  }

  ngOnInit(): void {
    this.populatePropertyDatas();
    if (this.propertyUnitData?.propertyId)
      this.populatePropertyUnitDatas(this.propertyUnitData?.propertyId)
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
      }
    );
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
      }
    );
  }

  onResetForm(): void {
    this.propertyUnitInfoForm = new FormGroup({
      'propertyUnitId': new FormControl(this.propertyUnitData?.propertyUnitId),
      'propertyId': new FormControl(this.propertyUnitData?.propertyId ? this.propertyUnitData?.propertyId : '', Validators.required),
      'propertyUnitName': new FormControl(this.propertyUnitData?.propertyUnitName, Validators.required),
      'propertyUnitAgencyCommission': new FormControl(this.propertyUnitData?.propertyUnitAgencyCommission, [Validators.required, Validators.min(0)]),
      'propertyUnitDeposit': new FormControl(this.propertyUnitData?.propertyUnitDeposit, [Validators.required, Validators.min(0)]),
      'propertyUnitRent': new FormControl(this.propertyUnitData?.propertyUnitRent, [Validators.required, Validators.min(0)]),
      'propertyUnitSummary': new FormControl(this.propertyUnitData?.propertyUnitSummary, Validators.required),
      'propertyUnitDescription': new FormControl(this.propertyUnitData?.propertyUnitDescription, Validators.required)
    });

    this.f['propertyId'].valueChanges.subscribe(data => {
      if (data)
        this.populatePropertyUnitDatas(data);
    });
  }

  get f() {
    return this.propertyUnitInfoForm.controls;
  }

  onSavePropertyUnitData() {

    this.submitted = true;

    if (this.propertyUnitInfoForm.invalid) {
      this.buttonDisable = false;
      alert('Please fill in all the details before submitting!');
      return;
    }

    this.buttonDisable = true;

    let observable: Observable<ApiResponse>;

    if (this.action === 'register') {
      observable = this.dataProviderService.submitPropertyUnitData(this.propertyUnitInfoForm.value)
    } else {
      observable = this.dataProviderService.updatePropertyUnitData(this.propertyUnitInfoForm.value)
    }

    observable.subscribe(
      data => {
        alert(data.message);
      },
      error => {
        console.error(error);
      },
      () => {
        this.populatePropertyUnitDatas(this.propertyUnitInfoForm.value.propertyId);
        this.buttonDisable = false;
        this.submitted = false;
      });
  }

  onResetPropertyUnitForm(): void {
    this.availablePropertyUnitDatas = [];
    this.propertyUnitInfoForm.reset({ propertyId: '' });
    this.submitted = false;
  }
}
