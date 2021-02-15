import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNavbar = false;
  pages = [
    { label: 'Home', route: 'home' },
    { label: 'Meeting 1', route: 'meeting1' },
    { label: 'Meeting 2', route: 'meeting2' },
    { label: 'Meeting 3', route: 'meeting3' },
  ];
  constructor() { }
  ngOnInit(): void {}
  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
}
