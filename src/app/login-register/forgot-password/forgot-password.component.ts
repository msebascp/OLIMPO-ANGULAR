import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponseToken} from "../../interfaces/responseToken";
import {Router} from "@angular/router";
import {ResetPasswordService} from "../../database/reset-password.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  showInvalidSubmit: boolean = false
  emailForm!: FormGroup
  response!: ResponseToken

  constructor(
    private passwordMethods: ResetPasswordService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.emailForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]]
      }
    )
  }

  ngOnInit(){
  }

  get form() {
    return this.emailForm.controls
  }

  sendEmail(){
    if (this.emailForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    let email = this.emailForm.get('email')?.value
    this.passwordMethods.forgotPassword(email)
  }
}
