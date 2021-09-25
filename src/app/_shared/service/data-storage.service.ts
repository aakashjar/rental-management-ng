import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProviderService } from './data-provider.service';

@Injectable({
	providedIn: 'root'
})
export class DataStorageService {

	private currentTenantData: any;
	private currentLandlordData: any;
	private currentPropertyData: any;
	private currentPropertyUnitData: any;
	private currentLeaseData: any;
	private currentInventoryData: any;
	private currentInvoiceSummaryData: any;

	constructor(private dataProviderService: DataProviderService, private router: Router, private route: ActivatedRoute) {
	}

	fetchCurrentTenantData(): any {
		return this.currentTenantData;
	}

	redirectToTenantList(): void {
		this.router.navigate(['tenant/list'], { relativeTo: this.route.firstChild });
	}

	prepareTenantDataForView(selectedTenantData: any): void {

		if (selectedTenantData) {

			this.dataProviderService.loadTenantData(selectedTenantData.tenantId).subscribe(
				data => {
					this.currentTenantData = data;
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['tenant/view'], { relativeTo: this.route.firstChild });
				});
		}
	}

	prepareTenantDataForEdit(selectedTenantData: any): void {

		if (selectedTenantData) {

			this.dataProviderService.loadTenantData(selectedTenantData.tenantId).subscribe(
				data => {
					this.currentTenantData = data;
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['tenant/update'], { relativeTo: this.route.firstChild });
				});
		}
	}

	prepareTenantDataForDelete(tenantId: number) {
		if (confirm('Tenant with ID: ' + tenantId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteTenantData(tenantId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['tenant/list'], { relativeTo: this.route.firstChild });
				});
	}

	fetchCurrentLandlordData(): any {
		return this.currentLandlordData;
	}

	redirectToLandlordList(): void {
		this.router.navigate(['landlord/list'], { relativeTo: this.route.firstChild });
	}

	prepareLandlordDataForView(selectedLandlordData: any): void {

		if (selectedLandlordData) {

			this.dataProviderService.loadLandlordData(selectedLandlordData.landlordId).subscribe(
				data => {
					this.currentLandlordData = data;
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['landlord/view'], { relativeTo: this.route.firstChild });
				});
		}
	}

	prepareLandlordDataForEdit(selectedLandlordData: any): void {

		if (selectedLandlordData) {

			this.dataProviderService.loadLandlordData(selectedLandlordData.landlordId).subscribe(
				data => {
					this.currentLandlordData = data;
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['landlord/update'], { relativeTo: this.route.firstChild });
				});
		}
	}

	prepareLandlordDataForDelete(landlordId: number) {
		if (confirm('Landlord with ID: ' + landlordId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteLandlordData(landlordId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['landlord/list'], { relativeTo: this.route.firstChild });
				});
	}


	fetchCurrentPropertyData(): any {
		return this.currentPropertyData;
	}

	redirectToPropertyList(): void {
		this.router.navigate(['property/list'], { relativeTo: this.route.firstChild });
	}

	preparePropertyDataForView(selectedPropertyData: any): void {

		if (selectedPropertyData) {

			this.dataProviderService.loadPropertyData(selectedPropertyData.propertyId).subscribe(
				data => {
					this.currentPropertyData = data;
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['property/view'], { relativeTo: this.route.firstChild });
				});
		}
	}

	preparePropertyDataForEdit(selectedPropertyData: any): void {

		if (selectedPropertyData) {

			this.dataProviderService.loadPropertyData(selectedPropertyData.propertyId).subscribe(
				data => {
					this.currentPropertyData = data;
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['property/update'], { relativeTo: this.route.firstChild });
				});
		}
	}

	preparePropertyDataForDelete(propertyId: number) {
		if (confirm('Property with ID: ' + propertyId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deletePropertyData(propertyId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['property/list'], { relativeTo: this.route.firstChild });
				});
	}


	fetchCurrentPropertyUnitData(): any {
		return this.currentPropertyUnitData;
	}

	redirectToPropertyUnitList(): void {
		this.router.navigate(['property-unit/list'], { relativeTo: this.route.firstChild });
	}

	preparePropertyUnitDataForView(selectedPropertyUnitData: any): void {
		if (selectedPropertyUnitData) {
			this.currentPropertyUnitData = selectedPropertyUnitData;
			this.router.navigate(['property-unit/view'], { relativeTo: this.route.firstChild });
		}
	}

	preparePropertyUnitDataForEdit(selectedPropertyUnitData: any): void {

		if (selectedPropertyUnitData) {

			this.dataProviderService.loadPropertyUnitData(selectedPropertyUnitData.propertyUnitId).subscribe(
				data => {
					this.currentPropertyUnitData = data;
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['property-unit/update'], { relativeTo: this.route.firstChild });
				});
		}
	}

	preparePropertyUnitDataForDelete(propertyUnitId: number) {
		if (confirm('Property Unit with ID: ' + propertyUnitId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deletePropertyUnitData(propertyUnitId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['property-unit/list'], { relativeTo: this.route.firstChild });
				});
	}


	fetchCurrentLeaseData(): any {
		return this.currentLeaseData;
	}

	redirectToActiveLeaseList(): void {
		this.router.navigate(['lease/list-active'], { relativeTo: this.route.firstChild });
	}

	redirectToTerminatedLeaseList(): void {
		this.router.navigate(['lease/list-terminated'], { relativeTo: this.route.firstChild });
	}

	prepareLeaseDataForView(selectedLeaseData: any): void {
		if (selectedLeaseData) {
			this.currentLeaseData = selectedLeaseData;
			this.router.navigate(['lease/view'], { relativeTo: this.route.firstChild });
		}
	}

	prepareLeaseDataForEdit(selectedLeaseData: any): void {
		if (selectedLeaseData) {
			this.currentLeaseData = selectedLeaseData;
			this.router.navigate(['lease/update'], { relativeTo: this.route.firstChild });
		}
	}

	prepareLeaseDataForTermination(leaseId: number) {
		if (confirm('Lease with ID: ' + leaseId + ' will be terminated, Continue?'))
			this.dataProviderService.terminateLeaseData(leaseId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['lease/list-active'], { relativeTo: this.route.firstChild });
				});
	}

	prepareLeaseDataForDelete(leaseId: number) {
		if (confirm('Lease with ID: ' + leaseId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteLeaseData(leaseId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['lease/list-terminated'], { relativeTo: this.route.firstChild });
				});
	}


	fetchCurrentInventoryData(): any {
		return this.currentInventoryData;
	}

	redirectToInventoryList(): void {
		this.router.navigate(['inventory/list'], { relativeTo: this.route.firstChild });
	}

	prepareInventoryDataForView(selectedInventoryData: any): void {
		if (selectedInventoryData) {
			this.currentInventoryData = selectedInventoryData;
			this.router.navigate(['inventory/view'], { relativeTo: this.route.firstChild });
		}
	}

	prepareInventoryDataForEdit(selectedInventoryData: any): void {
		if (selectedInventoryData) {
			this.currentInventoryData = selectedInventoryData;
			this.router.navigate(['inventory/update'], { relativeTo: this.route.firstChild });
		}
	}

	prepareInventoryDataForDelete(inventoryId: number) {
		if (confirm('Inventory with ID: ' + inventoryId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteInventoryData(inventoryId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.router.navigate(['inventory/list'], { relativeTo: this.route.firstChild });
				});
	}



	fetchCurrentInvoiceSummaryData(): any {
		return this.currentInvoiceSummaryData;
	}

	redirectToInvoiceSummaryList(): void {
		this.router.navigate(['invoice/list'], { relativeTo: this.route.firstChild });
	}

	prepareInvoiceSummaryDataForView(selectedInvoiceSummaryData: any) {
		if (selectedInvoiceSummaryData) {
			this.currentInvoiceSummaryData = selectedInvoiceSummaryData;
			this.router.navigate(['invoice/view'], { relativeTo: this.route.firstChild });
		}

	}
}



