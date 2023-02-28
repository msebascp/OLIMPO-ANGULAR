import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponseToken} from "../../interfaces/responseToken";
import {AuthPassportService} from "../../database/auth-passport.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
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
        email: ["", [Validators.required, Validators.email]]
      }
    )
  }

  ngOnInit(){
  }

  get form() {
    return this.loginForm.controls
  }

  sendEmail(){
    if (this.loginForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    console.log('hola')
  }
}
