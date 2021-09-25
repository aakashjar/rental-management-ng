import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataProviderService } from 'src/app/_shared/service/data-provider.service';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-list-inventory',
	templateUrl: './list-inventory.component.html',
	styleUrls: ['./list-inventory.component.css']
})
export class ListInventoryComponent implements OnInit {

	inventorySummaryDatas: any;
	isLoading: boolean = true;

	constructor(private title: Title, private dataProviderService: DataProviderService, private dataStorageService: DataStorageService) {
		this.title.setTitle('View Inventory List - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		this.populateInventorySummaryDataList();
	}

	populateInventorySummaryDataList() {
		this.isLoading = true;
		this.dataProviderService.loadInventorySummaryDatas().subscribe(
			data => {
				this.inventorySummaryDatas = data;
			},
			error => {
				console.error(error);
			},
			() => {
				this.isLoading = false;
			});
	}

	onDeleteInventoryData(inventoryId: number) {
		if (confirm('Inventory with ID: ' + inventoryId + ' will be removed from the system, Continue?'))
			this.dataProviderService.deleteInventoryData(inventoryId).subscribe(
				data => {
					alert(data.message)
				},
				error => {
					console.error(error);
				},
				() => {
					this.populateInventorySummaryDataList();
				});
	}

	onEditInventoryData(inventory: any) {
		this.dataStorageService.prepareInventoryDataForEdit(inventory);
	}

	onViewInventoryData(inventory: any) {
		this.dataStorageService.prepareInventoryDataForView(inventory);
	}
}
