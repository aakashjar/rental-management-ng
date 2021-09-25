import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vintage-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  toggleSideBar: boolean = false;

  constructor() { 
    // This is intentional
  }

  ngOnInit(): void {
    // This is intentional
  }

  toggleSideBarState(sideBarState: boolean) {
    this.toggleSideBar = sideBarState;
  }
}
