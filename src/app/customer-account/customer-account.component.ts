import { Component } from '@angular/core';
import {AuthPassportService} from "../database/auth-passport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent {

  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  ngOnInit(){
    this.auth.checkLogin();
  }
}
