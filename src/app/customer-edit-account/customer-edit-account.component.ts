import { Component } from '@angular/core';
import { Router } from 'express';
import { AuthPassportService } from '../database/auth-passport.service';

@Component({
  selector: 'app-customer-edit-account',
  templateUrl: './customer-edit-account.component.html',
  styleUrls: ['./customer-edit-account.component.scss']
})
export class CustomerEditAccountComponent {
  isLogin: boolean = false;
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  ngOnInit(){
    this.auth.checkLoginTrainer().then(isLogin => {
      if (isLogin) {
        this.isLogin = true;
      }
    });
  }

}
