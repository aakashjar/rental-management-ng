import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../model/api-response.model';

@Injectable()
export class DataProviderService {

	public healthStatus: Observable<string>;

	public httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8' })
	};

	constructor(private http: HttpClient) {
		this.healthStatus = this.loadAPIHealthStatus();
	}

	loadAPIHealthStatus(): Observable<any> {
		return this.http.get(`${environment.backEndUrl}/health`);
	}

	submitTenantData(data: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.backEndUrl}/tenant/register`, JSON.stringify(data), this.httpOptions);
	}

	loadTenantDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/tenant/list`);
	}

	loadTenantSummaryDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/tenant/summary/list`);
	}

	loadTenantData(tenantId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/tenant/${tenantId}`);
	}

	updateTenantData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/tenant/update`, JSON.stringify(data), this.httpOptions);
	}

	deleteTenantData(tenantId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/tenant/${tenantId}`);
	}



	submitLandlordData(data: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.backEndUrl}/landlord/register`, JSON.stringify(data), this.httpOptions);
	}

	loadLandlordDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/landlord/list`);
	}

	loadLandlordSummaryDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/landlord/summary/list`);
	}

	loadLandlordData(landlordId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/landlord/${landlordId}`);
	}

	updateLandlordData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/landlord/update`, JSON.stringify(data), this.httpOptions);
	}

	deleteLandlordData(landlordId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/landlord/${landlordId}`);
	}



	submitPropertyData(data: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.backEndUrl}/property/register`, JSON.stringify(data), this.httpOptions);
	}

	loadPropertyDatas(landlordId?: number): Observable<any> {
		if (landlordId)
			return this.http.get<any>(`${environment.backEndUrl}/property/list/landlord/${landlordId}`);
		else
			return this.http.get<any>(`${environment.backEndUrl}/property/list`);
	}

	loadPropertySummaryDatas(landlordId?: number): Observable<any> {
		if (landlordId)
			return this.http.get<any>(`${environment.backEndUrl}/property/summary/landlord/${landlordId}`);
		else
			return this.http.get<any>(`${environment.backEndUrl}/property/summary/list`);
	}

	loadPropertyData(propertyId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/property/${propertyId}`);
	}

	updatePropertyData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/property/update`, JSON.stringify(data), this.httpOptions);
	}

	deletePropertyData(propertyId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/property/${propertyId}`);
	}

	updatePropertyOwnershipData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/property/transfer`, JSON.stringify(data), this.httpOptions);
	}



	submitPropertyUnitData(data: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.backEndUrl}/property-unit/register`, JSON.stringify(data), this.httpOptions);
	}

	loadPropertyUnitDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/property-unit/list`);
	}

	loadPropertyUnitSummaryDatas(propertyId?: number): Observable<any> {
		if (propertyId)
			return this.http.get<any>(`${environment.backEndUrl}/property-unit/summary/property/${propertyId}`);
		else
			return this.http.get<any>(`${environment.backEndUrl}/property-unit/summary/list`);
	}

	loadPropertyUnitData(propertyUnitId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/property-unit/${propertyUnitId}`);
	}

	loadPropertyUnitsFromProperty(propertyId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/property-unit/property/${propertyId}`);
	}

	updatePropertyUnitData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/property-unit/update`, JSON.stringify(data), this.httpOptions);
	}

	deletePropertyUnitData(propertyUnitId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/property-unit/${propertyUnitId}`);
	}




	submitLeaseData(data: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.backEndUrl}/lease/create`, JSON.stringify(data), this.httpOptions);
	}

	loadActiveLeaseDatas(tenantId?: number): Observable<any> {
		if (tenantId)
			return this.http.get<any>(`${environment.backEndUrl}/lease/list-active/tenant/${tenantId}`);
		else
			return this.http.get<any>(`${environment.backEndUrl}/lease/list-active`);
	}

	loadActiveLeaseSummaryDatas(tenantId?: number): Observable<any> {
		if (tenantId)
			return this.http.get<any>(`${environment.backEndUrl}/lease/summary/list-active/tenant/${tenantId}`);
		else
			return this.http.get<any>(`${environment.backEndUrl}/lease/summary/list-active`);
	}

	loadTerminatedLeaseSummaryDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/lease/summary/list-terminated`);
	}

	loadTerminatedLeaseDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/lease/list-terminated`);
	}

	loadLeaseData(leaseId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/lease/${leaseId}`);
	}

	updateLeaseData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/lease/update`, JSON.stringify(data), this.httpOptions);
	}

	terminateLeaseData(leaseId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/lease/terminate/${leaseId}`);
	}

	deleteLeaseData(leaseId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/lease/${leaseId}`);
	}


	submitInventoryData(data: any): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.backEndUrl}/inventory/create`, JSON.stringify(data), this.httpOptions);
	}

	loadInventoryDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/inventory/list`);
	}

	loadInventorySummaryDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/inventory/summary/list`);
	}

	loadInventoryData(inventoryId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/inventory/${inventoryId}`);
	}

	updateInventoryData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/inventory/update`, JSON.stringify(data), this.httpOptions);
	}

	deleteInventoryData(inventoryId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/inventory/${inventoryId}`);
	}


	loadInvoiceSummaryDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/invoice/summary/list`);
	}

	loadInvoiceMonthSummaryDatas(): Observable<any> {
		return this.http.get<any>(`${environment.backEndUrl}/invoice/month/list`);
	}

	payInvoice(invoiceId: number): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(`${environment.backEndUrl}/invoice/pay/${invoiceId}`, null, this.httpOptions);
	}

	loadInvoiceData(invoiceId: number): Observable<any> {
		return this.http.get<ApiResponse>(`${environment.backEndUrl}/invoice/${invoiceId}`);
	}

	updateInvoiceData(data: any): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(`${environment.backEndUrl}/invoice/update`, JSON.stringify(data), this.httpOptions);
	}

	deleteInvoiceData(invoiceId: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(`${environment.backEndUrl}/invoice/${invoiceId}`);
	}
}