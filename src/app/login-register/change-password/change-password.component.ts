import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ResponseToken} from "../../interfaces/responseToken";
import {ResetPasswordService} from "../../database/reset-password.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthPassportService} from "../../database/auth-passport.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  showInvalidSubmit: boolean = false
  passwordForm!: FormGroup
  isTrainer!:boolean

  constructor(
    private passwordMethods: ResetPasswordService,
    private auth: AuthPassportService,
    private router: Router,
    private formBuilder: FormBuilder,
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
    this.auth.checkDouble().subscribe(data  => {
      this.isTrainer = data.isTrainer
    })
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
    if (this.isTrainer){
      this.passwordMethods.changePasswordTrainer(password)
    } else {
      this.passwordMethods.changePassword(password)
    }
  }
}
