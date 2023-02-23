import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'navbar-customer',
  templateUrl: './navbar-customer.component.html',
  styleUrls: ['./navbar-customer.component.scss']
})
export class NavbarCustomerComponent {
  constructor(
    public router: Router
  ) { }
}
