import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'vintage-create-inventory',
	templateUrl: './create-inventory.component.html',
	styleUrls: ['./create-inventory.component.css']
})
export class CreateInventoryComponent implements OnInit {

	constructor(private title: Title) {
		this.title.setTitle('Register Inventory - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}


}
