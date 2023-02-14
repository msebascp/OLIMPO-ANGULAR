import { Component } from '@angular/core';
import {AuthPassportService} from "../database/auth-passport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent {
  isLogin: boolean = false;
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  ngOnInit(){
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
      }
    });
  }
}
