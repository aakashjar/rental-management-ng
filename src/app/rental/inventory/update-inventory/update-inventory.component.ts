import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataStorageService } from 'src/app/_shared/service/data-storage.service';

@Component({
	selector: 'vintage-update-inventory',
	templateUrl: './update-inventory.component.html',
	styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent implements OnInit {

	selectedInventoryData: any;

	constructor(private title: Title, private dataStorageService: DataStorageService) {

		this.selectedInventoryData = dataStorageService.fetchCurrentInventoryData();

		if (!this.selectedInventoryData) {
			this.dataStorageService.redirectToInventoryList();
		}
		this.title.setTitle('Update Inventory - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}
}
