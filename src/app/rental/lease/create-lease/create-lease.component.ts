import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vintage-create-lease',
  templateUrl: './create-lease.component.html',
  styleUrls: ['./create-lease.component.css']
})
export class CreateLeaseComponent implements OnInit {

  constructor(private title: Title) {
    this.title.setTitle('Create Lease - Vintage (Rental Management System)');
  }

  ngOnInit(): void {
    // This is intentional
  }

}
