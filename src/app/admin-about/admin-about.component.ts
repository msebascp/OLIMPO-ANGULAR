import { Component } from '@angular/core';
import {AuthPassportService} from "../database/auth-passport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.scss']
})
export class AdminAboutComponent {
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
