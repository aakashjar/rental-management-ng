import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
  selector: 'vintage-view-inventory',
  templateUrl: './view-inventory.component.html',
  styleUrls: ['./view-inventory.component.css']
})
export class ViewInventoryComponent implements OnInit {

  selectedInventoryData: any;

  constructor(private title: Title, private dataStorageService: DataStorageService) {

    this.selectedInventoryData = dataStorageService.fetchCurrentInventoryData();

    if (!this.selectedInventoryData) {
      this.dataStorageService.redirectToInventoryList();
    }
    this.title.setTitle(`View Inventory (#${this.selectedInventoryData.inventoryId}) - Vintage (Rental Management System)`);
  }

  ngOnInit(): void {
    // This is intentional
  }

  onEditInventoryData(tenant: any) {
    this.dataStorageService.prepareInventoryDataForEdit(tenant);
  }

  onDeleteInventoryData(inventoryId: number) {
    this.dataStorageService.prepareInventoryDataForDelete(inventoryId);
  }
}
