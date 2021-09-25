import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vintage-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  toggleSideBar: boolean = false;

  constructor(private title: Title) {
    this.title.setTitle('Home - Vintage (Rental Management System)');
  }

  toggleSideBarState(sideBarState: any) {
    this.toggleSideBar = sideBarState;
  }

  ngOnInit(): void {
    // This is intentional
  }

}
