import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'vintage-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	toggleSideBar: boolean = false;
	@Output() changeSideBarState = new EventEmitter<boolean>();

	constructor(private router: Router) {
		// This is intentional
	}

	ngOnInit() {
		// This is intentional
	}

	onToggleSideBar() {
		this.toggleSideBar = !this.toggleSideBar;
		this.changeSideBarState.emit(this.toggleSideBar);
	}

	onSignOut() {
		localStorage.removeItem('accessToken');
		this.router.navigate(['/signin']);
	}

}
