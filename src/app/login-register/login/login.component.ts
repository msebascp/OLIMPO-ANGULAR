import {Component, EventEmitter, Output} from '@angular/core';
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router } from "@angular/router";
import Swal from "sweetalert2";
import {ResponseToken} from "../../interfaces/responseToken";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLogin: boolean = true
  showInvalidSubmit: boolean = false
  token: string = ''
  loginForm!: FormGroup
  response!: ResponseToken

  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]]
      }
    )
  }

  ngOnInit(){
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
  }

  get form() {
    return this.loginForm.controls
  }

  login() {
    if (this.loginForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    let email = this.loginForm.get('email')?.value
    let password = this.loginForm.get('password')?.value
    this.auth.login(email, password).subscribe(
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
