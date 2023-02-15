import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthPassportService} from "../database/auth-passport.service";

@Component({
  selector: 'header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {
  infoAuth!: { isLogin:boolean, isTrainer:boolean };
  showOptions: boolean = false;

  constructor(
    public router: Router,
    public auth: AuthPassportService
  ) { }

  ngOnInit() {
    console.log("el ngoninit del nav se ejecuta")
    this.auth.getVariable().subscribe(infoAuth => {
      this.infoAuth = infoAuth;
      console.log("la variable es " + infoAuth.isLogin + " y " + infoAuth.isTrainer);
    });
  }

  logout() {
    if (this.infoAuth.isLogin && !this.infoAuth.isTrainer) {
      this.auth.logout();
    } else if (this.infoAuth.isLogin && this.infoAuth.isTrainer) {
      this.auth.logoutTrainer();
    }
  }

  hide() {
    setTimeout(() => {
      this.showOptions = false;
    }, 150);
  }
}
