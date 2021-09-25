import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataProviderService } from './_shared/service/data-provider.service';
import { HomeComponent } from './home/home.component';
import { RentalComponent } from './rental/rental.component';
import { LandlordComponent } from './rental/landlord/landlord.component';
import { ListLandlordComponent } from './rental/landlord/list-landlord/list-landlord.component';
import { TenantComponent } from './rental/tenant/tenant.component';
import { ListTenantComponent } from './rental/tenant/list-tenant/list-tenant.component';
import { PropertyComponent } from './rental/property/property.component';
import { ListPropertyComponent } from './rental/property/list-property/list-property.component';
import { PropertyUnitComponent } from './rental/property-unit/property-unit.component';
import { ListPropertyUnitComponent } from './rental/property-unit/list-property-unit/list-property-unit.component';
import { SigninComponent } from './signin/signin.component';
import { MenuComponent } from './_shared/component/menu/menu.component';
import { HeaderComponent } from './_shared/component/header/header.component';
import { FooterComponent } from './_shared/component/footer/footer.component';
import { RegisterTenantComponent } from './rental/tenant/register-tenant/register-tenant.component';
import { RegisterLandlordComponent } from './rental/landlord/register-landlord/register-landlord.component';
import { RegisterPropertyComponent } from './rental/property/register-property/register-property.component';
import { RegisterPropertyUnitComponent } from './rental/property-unit/register-property-unit/register-property-unit.component';
import { HttpClientModule } from '@angular/common/http';
import { UpdateTenantComponent } from './rental/tenant/update-tenant/update-tenant.component';
import { ViewTenantComponent } from './rental/tenant/view-tenant/view-tenant.component';
import { LandlordFormComponent } from './_shared/component/forms/landlord-form/landlord-form.component';
import { TenantFormComponent } from './_shared/component/forms/tenant-form/tenant-form.component';
import { ViewLandlordComponent } from './rental/landlord/view-landlord/view-landlord.component';
import { UpdateLandlordComponent } from './rental/landlord/update-landlord/update-landlord.component';
import { UpdatePropertyComponent } from './rental/property/update-property/update-property.component';
import { ViewPropertyComponent } from './rental/property/view-property/view-property.component';
import { UpdatePropertyUnitComponent } from './rental/property-unit/update-property-unit/update-property-unit.component';
import { ViewPropertyUnitComponent } from './rental/property-unit/view-property-unit/view-property-unit.component';
import { PropertyFormComponent } from './_shared/component/forms/property-form/property-form.component';
import { PropertyUnitFormComponent } from './_shared/component/forms/property-unit-form/property-unit-form.component';
import { LeaseComponent } from './rental/lease/lease.component';
import { CreateLeaseComponent } from './rental/lease/create-lease/create-lease.component';
import { ListActiveLeaseComponent } from './rental/lease/list-active-lease/list-active-lease.component';
import { ListTerminatedLeaseComponent } from './rental/lease/list-terminated-lease/list-terminated-lease.component';
import { LeaseFormComponent } from './_shared/component/forms/lease-form/lease-form.component';
import { ViewLeaseComponent } from './rental/lease/view-lease/view-lease.component';
import { UpdateLeaseComponent } from './rental/lease/update-lease/update-lease.component';
import { InventoryComponent } from './rental/inventory/inventory.component';
import { CreateInventoryComponent } from './rental/inventory/create-inventory/create-inventory.component';
import { UpdateInventoryComponent } from './rental/inventory/update-inventory/update-inventory.component';
import { ListInventoryComponent } from './rental/inventory/list-inventory/list-inventory.component';
import { ViewInventoryComponent } from './rental/inventory/view-inventory/view-inventory.component';
import { InventoryFormComponent } from './_shared/component/forms/inventory-form/inventory-form.component';
import { OccupancyStatusColorCodePipe } from './_shared/pipes/occupancy-status-color-code.pipe';
import { InvoiceComponent } from './rental/invoice/invoice.component';
import { ViewInvoiceComponent } from './rental/invoice/view-invoice/view-invoice.component';
import { ListInvoiceMonthComponent } from './rental/invoice/list-invoice-month/list-invoice-month.component';
import { ListInvoiceComponent } from './rental/invoice/list-invoice/list-invoice.component';
import { PaymentStatusColorCodePipe } from './_shared/pipes/payment-status-color-code.pipe';
import { NgxPrintModule } from 'ngx-print';
import { AuthGuard } from './_shared/service/auth-guard.service';
import { DashboardComponent } from './_shared/component/dashboard/dashboard.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		SigninComponent,
		MenuComponent,
		HeaderComponent,
		FooterComponent,
		RentalComponent,
		LandlordComponent,
		ListLandlordComponent,
		TenantComponent,
		ListTenantComponent,
		PropertyComponent,
		ListPropertyComponent,
		PropertyUnitComponent,
		ListPropertyUnitComponent,
		RegisterTenantComponent,
		RegisterLandlordComponent,
		RegisterPropertyComponent,
		RegisterPropertyUnitComponent,
		TenantFormComponent,
		UpdateTenantComponent,
		ViewTenantComponent,
		LandlordFormComponent,
		ViewLandlordComponent,
		UpdateLandlordComponent,
		UpdatePropertyComponent,
		ViewPropertyComponent,
		UpdatePropertyUnitComponent,
		ViewPropertyUnitComponent,
		PropertyFormComponent,
		PropertyUnitFormComponent,
		LeaseComponent,
		CreateLeaseComponent,
		ListActiveLeaseComponent,
		ListTerminatedLeaseComponent,
		LeaseFormComponent,
		ViewLeaseComponent,
		UpdateLeaseComponent,
		InventoryComponent,
		CreateInventoryComponent,
		UpdateInventoryComponent,
		ListInventoryComponent,
		ViewInventoryComponent,
		InventoryFormComponent,
		OccupancyStatusColorCodePipe,
		PaymentStatusColorCodePipe,
		InvoiceComponent,
		ViewInvoiceComponent,
		ListInvoiceMonthComponent,
		ListInvoiceComponent,
  DashboardComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgxPrintModule
	],
	providers: [
		{ provide: LocationStrategy, useClass: PathLocationStrategy },
		DataProviderService, AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
