import { Component } from '@angular/core';
import {ResponseToken} from "../../interfaces/responseToken";
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-trainer',
  templateUrl: './login-trainer.component.html',
  styleUrls: ['./login-trainer.component.scss']
})
export class LoginTrainerComponent {

  token: string = ''
  isLogin:boolean = true
  showInvalidSubmit: boolean = false
  response!: ResponseToken
  loginTrainerForm!: FormGroup

  constructor(
    private auth: AuthPassportService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginTrainerForm = this.formBuilder.group(
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
    return this.loginTrainerForm.controls
  }

  login() {
    if (this.loginTrainerForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    let email = this.loginTrainerForm.get('email')?.value
    let password = this.loginTrainerForm.get('password')?.value
    this.auth.loginTrainer(email, password).subscribe(
      data  => {
        console.log(data);
        if (data.success) {
          this.token = data.data.token;
          localStorage.setItem('access_token', this.token);
          this.auth.sendVariable(data.data.isLogin, true);
          this.router.navigate(['/admin/users']);
        }
        else {
          Swal.fire(data.message);
        }
      }
    );
  }
}
