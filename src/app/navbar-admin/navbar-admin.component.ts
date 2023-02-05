import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent {
  constructor(
    public router: Router
  ) { }
}
