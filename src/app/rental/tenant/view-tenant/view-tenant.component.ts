import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-view-tenant',
	templateUrl: './view-tenant.component.html',
	styleUrls: ['./view-tenant.component.css']
})
export class ViewTenantComponent implements OnInit {

	selectedTenantData: any;

	availableLeaseSummaryDatas: any;
	isLeaseLoading: boolean = true;

	constructor(private title: Title, private dataStorageService: DataStorageService, private dataProviderService: DataProviderService) {

		this.selectedTenantData = dataStorageService.fetchCurrentTenantData();

		if (!this.selectedTenantData) {
			this.dataStorageService.redirectToTenantList();
		}
		this.title.setTitle(`View Tenant (#${this.selectedTenantData.tenantId}) - Vintage (Rental Management System)`);
	}

	ngOnInit(): void {
		this.populateActiveLeaseSummaryDataList(this.selectedTenantData.tenantId);
	}

	populateActiveLeaseSummaryDataList(tenantId: number) {
		this.isLeaseLoading = true;
		this.dataProviderService.loadActiveLeaseSummaryDatas(tenantId).subscribe(
			data => {
				this.availableLeaseSummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLeaseLoading = false;
			});
	}

	onEditTenantData(tenant: any) {
		this.dataStorageService.prepareTenantDataForEdit(tenant);
	}

	onViewTenantData(tenant: any) {
		this.dataStorageService.prepareTenantDataForView(tenant);
	}

	onDeleteTenantData(tenantId: number) {
		this.dataStorageService.prepareTenantDataForDelete(tenantId);
	}
}
