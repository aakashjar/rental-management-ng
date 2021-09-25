import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
  selector: 'vintage-update-tenant',
  templateUrl: './update-tenant.component.html',
  styleUrls: ['./update-tenant.component.css']
})
export class UpdateTenantComponent implements OnInit {

  selectedTenantData: any;

  constructor(private title: Title, private dataStorageService: DataStorageService) {

    this.selectedTenantData = dataStorageService.fetchCurrentTenantData();

    if (!this.selectedTenantData) {
      this.dataStorageService.redirectToTenantList();
    }
    this.title.setTitle('Update Tenant - Vintage (Rental Management System)');
  }

  ngOnInit(): void {
    // This is intentional
  }

}
