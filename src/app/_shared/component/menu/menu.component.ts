import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'vintage-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

	@Input() toggleSideBar: boolean = false;
	assetUrl: string;

	constructor() {
		this.assetUrl = environment.assetUrl;
	}

	ngOnInit() {
		// This is intentional
	}
}
