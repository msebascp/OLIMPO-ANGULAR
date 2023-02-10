import { Component } from '@angular/core';
import {AuthPassportService} from "../database/auth-passport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent {
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  ngOnInit(){
    this.auth.isLoggedIn();
    this.auth.isTrainer().subscribe(data=>{
      console.log(data);
      if (!data.data.isTrainer) {this.router.navigate(['/home'])}
    })
  }
}
