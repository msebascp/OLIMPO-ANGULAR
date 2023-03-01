import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponseToken} from "../../interfaces/responseToken";
import {ResetPasswordService} from "../../database/reset-password.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password-trainer',
  templateUrl: './forgot-password-trainer.component.html',
  styleUrls: ['./forgot-password-trainer.component.scss']
})
export class ForgotPasswordTrainerComponent {
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
    this.passwordMethods.forgotPasswordTrainer(email)
  }
}
