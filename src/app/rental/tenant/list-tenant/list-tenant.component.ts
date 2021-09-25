import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
  selector: 'vintage-list-tenant',
  templateUrl: './list-tenant.component.html',
  styleUrls: ['./list-tenant.component.css']
})
export class ListTenantComponent implements OnInit {

  tenantSummaryDatas: any;
  isLoading: boolean = true;

  constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
    this.title.setTitle('View Tenants - Vintage (Rental Management System)');
  }

  ngOnInit(): void {
    this.populateTenantSummaryDataList();
  }

  populateTenantSummaryDataList() {
    this.isLoading = true;
    this.dataProviderService.loadTenantSummaryDatas().subscribe(
      data => {
        this.tenantSummaryDatas = data;
      },
      error => {
        console.error(error);
      },
      () => {
        this.isLoading = false;
      });
  }

  onDeleteTenantData(tenantId: number) {
    if (confirm('Tenant with ID: ' + tenantId + ' will be removed from the system, Continue?'))
      this.dataProviderService.deleteTenantData(tenantId).subscribe(
        data => {
          alert(data.message)
        },
        error => {
          console.error(error);
        },
        () => {
          this.populateTenantSummaryDataList();
        });
  }

  onEditTenantData(tenant: any) {
    this.dataStorageService.prepareTenantDataForEdit(tenant);
  }

  onViewTenantData(tenant: any) {
    this.dataStorageService.prepareTenantDataForView(tenant);
  }
}
