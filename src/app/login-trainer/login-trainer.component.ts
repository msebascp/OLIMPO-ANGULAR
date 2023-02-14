import { Component } from '@angular/core';
import {ResponseToken} from "../interfaces/response-token";
import {AuthPassportService} from "../database/auth-passport.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login-trainer',
  templateUrl: './login-trainer.component.html',
  styleUrls: ['./login-trainer.component.scss']
})
export class LoginTrainerComponent {
  email: string = '';
  password: string = '';
  token: string = '';
  response!: ResponseToken;
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }

  ngOnInit(){
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (!isLogin){
        this.auth.checkLogin();
      }
    });
  }

  login() {
    this.auth.loginTrainer(this.email, this.password).subscribe(
      data  => {
        console.log(data);
        if (data.success) {
          this.token = data.data.token;
          localStorage.setItem('access_token', this.token);
          this.router.navigate(['/admin/account']);
        }
        else {
          Swal.fire(data.message);
        }
      }
    );
  }
}
