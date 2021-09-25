import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateInventoryComponent } from './rental/inventory/create-inventory/create-inventory.component';
import { ListInventoryComponent } from './rental/inventory/list-inventory/list-inventory.component';
import { UpdateInventoryComponent } from './rental/inventory/update-inventory/update-inventory.component';
import { ViewInventoryComponent } from './rental/inventory/view-inventory/view-inventory.component';
import { ListInvoiceMonthComponent } from './rental/invoice/list-invoice-month/list-invoice-month.component';
import { ListInvoiceComponent } from './rental/invoice/list-invoice/list-invoice.component';
import { ViewInvoiceComponent } from './rental/invoice/view-invoice/view-invoice.component';
import { ListLandlordComponent } from './rental/landlord/list-landlord/list-landlord.component';
import { RegisterLandlordComponent } from './rental/landlord/register-landlord/register-landlord.component';
import { UpdateLandlordComponent } from './rental/landlord/update-landlord/update-landlord.component';
import { ViewLandlordComponent } from './rental/landlord/view-landlord/view-landlord.component';
import { CreateLeaseComponent } from './rental/lease/create-lease/create-lease.component';
import { ListActiveLeaseComponent } from './rental/lease/list-active-lease/list-active-lease.component';
import { ListTerminatedLeaseComponent } from './rental/lease/list-terminated-lease/list-terminated-lease.component';
import { UpdateLeaseComponent } from './rental/lease/update-lease/update-lease.component';
import { ViewLeaseComponent } from './rental/lease/view-lease/view-lease.component';
import { ListPropertyUnitComponent } from './rental/property-unit/list-property-unit/list-property-unit.component';
import { RegisterPropertyUnitComponent } from './rental/property-unit/register-property-unit/register-property-unit.component';
import { UpdatePropertyUnitComponent } from './rental/property-unit/update-property-unit/update-property-unit.component';
import { ViewPropertyUnitComponent } from './rental/property-unit/view-property-unit/view-property-unit.component';
import { ListPropertyComponent } from './rental/property/list-property/list-property.component';
import { RegisterPropertyComponent } from './rental/property/register-property/register-property.component';
import { UpdatePropertyComponent } from './rental/property/update-property/update-property.component';
import { ViewPropertyComponent } from './rental/property/view-property/view-property.component';
import { RentalComponent } from './rental/rental.component';
import { ListTenantComponent } from './rental/tenant/list-tenant/list-tenant.component';
import { RegisterTenantComponent } from './rental/tenant/register-tenant/register-tenant.component';
import { UpdateTenantComponent } from './rental/tenant/update-tenant/update-tenant.component';
import { ViewTenantComponent } from './rental/tenant/view-tenant/view-tenant.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './_shared/component/dashboard/dashboard.component';
import { AuthGuard } from './_shared/service/auth-guard.service';

const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/signin' },
	{ path: 'signin', component: SigninComponent },
	{
		path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
			{ path: '', component: DashboardComponent }
		]
	},
	{
		path: 'section', component: RentalComponent, canActivate: [AuthGuard], children: [
			{
				path: 'landlord', children: [
					{ path: 'register', component: RegisterLandlordComponent },
					{ path: 'list', component: ListLandlordComponent },
					{ path: 'view', component: ViewLandlordComponent },
					{ path: 'update', component: UpdateLandlordComponent }
				]
			},
			{
				path: 'tenant', children: [
					{ path: 'register', component: RegisterTenantComponent },
					{ path: 'list', component: ListTenantComponent },
					{ path: 'view', component: ViewTenantComponent },
					{ path: 'update', component: UpdateTenantComponent }
				]
			},
			{
				path: 'property', children: [
					{ path: 'register', component: RegisterPropertyComponent },
					{ path: 'list', component: ListPropertyComponent },
					{ path: 'view', component: ViewPropertyComponent },
					{ path: 'update', component: UpdatePropertyComponent }
				]
			},
			{
				path: 'property-unit', children: [
					{ path: 'register', component: RegisterPropertyUnitComponent },
					{ path: 'list', component: ListPropertyUnitComponent },
					{ path: 'view', component: ViewPropertyUnitComponent },
					{ path: 'update', component: UpdatePropertyUnitComponent }
				]
			},
			{
				path: 'lease', children: [
					{ path: 'create', component: CreateLeaseComponent },
					{ path: 'list-active', component: ListActiveLeaseComponent },
					{ path: 'list-terminated', component: ListTerminatedLeaseComponent },
					{ path: 'view', component: ViewLeaseComponent },
					{ path: 'update', component: UpdateLeaseComponent }
				]
			},
			{
				path: 'inventory', children: [
					{ path: 'create', component: CreateInventoryComponent },
					{ path: 'list', component: ListInventoryComponent },
					{ path: 'view', component: ViewInventoryComponent },
					{ path: 'update', component: UpdateInventoryComponent }
				]
			},
			{
				path: 'invoice', children: [
					{ path: 'list-month', component: ListInvoiceMonthComponent },
					{ path: 'list', component: ListInvoiceComponent },
					{ path: 'view', component: ViewInvoiceComponent }
				]
			}
		]
	},
	// { path: '**', redirectTo: '/home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
