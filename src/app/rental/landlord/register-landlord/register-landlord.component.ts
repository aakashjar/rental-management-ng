import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'vintage-register-landlord',
	templateUrl: './register-landlord.component.html',
	styleUrls: ['./register-landlord.component.css']
})
export class RegisterLandlordComponent implements OnInit {

	constructor(private title: Title) {
		this.title.setTitle('Register Landlord - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}

}
