import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../_shared/model/user-info/user.model';
import { DataProviderService } from '../_shared/service/data-provider.service';

@Component({
	selector: 'vintage-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	user: User = new User('', '');

	message: string = '';
	redirectURL: string = '';
	error = '';
	assetUrl: any = environment.assetUrl;
	buttonDisable: boolean = false;

	constructor(protected title: Title, protected router: Router, protected dataProviderService: DataProviderService, private route: ActivatedRoute) {

		title.setTitle('Sign In - Vintage (Rental Management System)');
	}

	ngOnInit(): void {

		if (localStorage.getItem("accessToken") != undefined || localStorage.getItem("accessToken") !== null) {
			this.router.navigate(['/home']);
		}
		// get return url from route parameters or default to '/'
		this.redirectURL = this.route.snapshot.queryParams['continue'] || '/home';
	}

	onSignIn(form: NgForm) {
		this.buttonDisable = true;
		if (form.invalid) {
			alert('Incomplete details provided, Please try again!');
			this.buttonDisable = false;
			return false;
		}

		if (form.value.userName == 'admin' && form.value.password == '12345') {
			localStorage.setItem('accessToken', 'true');
			this.router.navigate([this.redirectURL]);
			return true;
		} else {
			alert('Incorrect username or password, Please try again!');
			return false;
		}
	}

}
