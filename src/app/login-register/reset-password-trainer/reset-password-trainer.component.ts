import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponseToken} from "../../interfaces/responseToken";
import {ResetPasswordService} from "../../database/reset-password.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset-password-trainer',
  templateUrl: './reset-password-trainer.component.html',
  styleUrls: ['./reset-password-trainer.component.scss']
})
export class ResetPasswordTrainerComponent {
  showInvalidSubmit: boolean = false
  token: string = ''
  passwordForm!: FormGroup
  response!: ResponseToken

  constructor(
    private passwordMethods: ResetPasswordService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        password: ["", [Validators.required]],
        confirmPassword: ["", [Validators.required, this.matchPassword.bind(this)]],
      }
    )
  }

  matchPassword(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;
    if (password !== confirmPassword) {
      return {'passwordMismatch': true};
    } else {
      return null;
    }
  }

  ngOnInit(){
    this.token = <string>this.route.snapshot.queryParamMap.get('token')
  }

  get form() {
    return this.passwordForm.controls
  }

  sendEmail(){
    if (this.passwordForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    let password = this.passwordForm.get('password')?.value
    this.passwordMethods.resetPasswordTrainer(password, this.token)
  }
}
