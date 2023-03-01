import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPassportService } from 'src/app/database/auth-passport.service';

@Component({
  selector: 'app-navbar-olimpo',
  templateUrl: './navbar-olimpo.component.html',
  styleUrls: ['./navbar-olimpo.component.scss'],
})
export class NavbarOlimpoComponent {
  showOptions: boolean = false
  showSettingsOptions: boolean = false
  showDropdown: boolean = false
  infoAuth!: { isLogin:boolean, isTrainer:boolean };

  constructor(
    public router: Router,
    public auth: AuthPassportService
  ) {}

  ngOnInit(){
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
      this.showOptions = false
    }, 150);
  }

  hideSettingsOptions() {
    setTimeout(() => {
      this.showSettingsOptions = false
    }, 150);
  }

  hideDrop() {
    setTimeout(() => {
      this.showDropdown = false
    }, 150);
  }
}
