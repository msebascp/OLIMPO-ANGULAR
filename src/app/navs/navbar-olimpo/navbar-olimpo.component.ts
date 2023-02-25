import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-olimpo',
  templateUrl: './navbar-olimpo.component.html',
  styleUrls: ['./navbar-olimpo.component.scss'],
})
export class NavbarOlimpoComponent {
  showOptions: boolean = false
  showDropdown: boolean = false

  constructor(
    public router: Router
  ) {}

  hide() {
    setTimeout(() => {
      this.showOptions = false
    }, 150);
  }

  hideDrop() {
    setTimeout(() => {
      this.showDropdown = false
    }, 150);
  }
}
