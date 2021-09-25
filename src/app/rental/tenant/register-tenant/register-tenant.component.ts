import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vintage-register-tenant',
  templateUrl: './register-tenant.component.html',
  styleUrls: ['./register-tenant.component.css']
})
export class RegisterTenantComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Register Tenant - Vintage (Rental Management System)');
  }

  ngOnInit(): void {
    // This is intentional
  }

}
