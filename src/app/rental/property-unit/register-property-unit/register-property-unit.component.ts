import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'vintage-register-property-unit',
	templateUrl: './register-property-unit.component.html',
	styleUrls: ['./register-property-unit.component.css']
})
export class RegisterPropertyUnitComponent implements OnInit {

	constructor(private title: Title) {
		this.title.setTitle('Register Property Unit - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}

}
