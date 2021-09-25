import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'vintage-register-property',
	templateUrl: './register-property.component.html',
	styleUrls: ['./register-property.component.css']
})
export class RegisterPropertyComponent implements OnInit {

	constructor(private title: Title) {
		this.title.setTitle('Register Property - Vintage (Rental Management System)');
	}

	ngOnInit(): void {
		// This is intentional
	}

}
