import { Component } from '@angular/core';
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-customer-account',
  templateUrl: './customer-account.component.html',
  styleUrls: ['./customer-account.component.scss']
})
export class CustomerAccountComponent {
  isLogin: boolean = false;
  customer: Customer | undefined;
  infoAuth!: { isLogin:boolean, isTrainer:boolean};
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  ngOnInit(){
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
      this.infoAuth = infoAuth
    })
    this.dataCustomer();
  }
  public dataCustomer() {
    this.auth.dataCustomer().subscribe(customer => {
      this.customer = customer;
    });
}

public endPoint() {
  if (this.infoAuth.isLogin && !this.infoAuth.isTrainer) {
    this.auth.endPointCustomer();
  } 

}
}
