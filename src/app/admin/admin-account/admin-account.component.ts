import { Component } from '@angular/core';
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
import { Trainer } from '../../interfaces/trainer';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.scss']
})
export class AdminAccountComponent {
  isLogin: boolean = false;
  trainer: Trainer | undefined;
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  ngOnInit(){
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.dataTrainer()
  }
  public dataTrainer() {
    this.auth.dataTrainer().subscribe(trainer => {
      this.trainer = trainer;
    });
  }
}
