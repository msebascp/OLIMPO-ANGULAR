import {Component, EventEmitter, Output} from '@angular/core';
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router } from "@angular/router";
import Swal from "sweetalert2";
import {ResponseToken} from "../../interfaces/responseToken";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() variableEnviada = new EventEmitter<boolean>();

  email: string = '';
  password: string = '';
  token: string = '';
  response!: ResponseToken;
  isLogin: boolean = true;

  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }

  ngOnInit(){
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (!isLogin){
        this.auth.checkLogin().then((isLogin) => {
          if (!isLogin){
            this.isLogin = false;
          }
          else {
            this.variableEnviada.emit(isLogin);
          }
        });
      }
      else {
        this.variableEnviada.emit(isLogin);
      }
    });
  }

  login() {
    this.auth.login(this.email, this.password).subscribe(
      data  => {
        console.log(data);
        if (data.success) {
          this.token = data.data.token;
          localStorage.setItem('access_token', this.token);
          this.auth.sendVariable(data.data.isLogin, false);
          this.router.navigate(['/customer/account']);
        }
        else {
          Swal.fire(data.message);
        }
      }
    );
  }


}
