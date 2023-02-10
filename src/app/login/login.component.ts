import {Component} from '@angular/core';
import {AuthPassportService} from "../database/auth-passport.service";
import {Router } from "@angular/router";
import Swal from "sweetalert2";
import {ResponseToken} from "../interfaces/response-token";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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
  }

  login() {
    this.auth.login(this.email, this.password).subscribe(
      data  => {
        console.log(data);
        if (data.success) {
          this.token = data.data.token;
          localStorage.setItem('access_token', this.token);
          if (data.data.isTrainer){
            this.router.navigate(['/admin/account']);
          } else {
            this.router.navigate(['/home']);
          }
        }
        else {
          Swal.fire(data.message);
        }
      }
    );
  }
}
