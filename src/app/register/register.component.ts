import { Component } from '@angular/core';
import {AuthPassportService} from "../database/auth-passport.service";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Trainer} from "../interfaces/trainer";
import {DatabaseService} from "../database/database.service";
import {RegisterData} from "../interfaces/registerData";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLogin: boolean = false
  trainers: Trainer[] = []
  registerForm!: FormGroup
  showInvalidSubmit: boolean = false

  constructor(
    private auth: AuthPassportService,
    private databaseService: DatabaseService,
    private formBuilder: FormBuilder
  ) {
  }
  ngOnInit(){
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
        this.getAllTrainers();
      }
    });
    this.registerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
        surname: ["", [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
        email: ["", [Validators.required, Validators.email]],
        typeTraining: ["Ninguno", Validators.pattern(/^[a-zA-Z ]+$/)],
        trainer: [""],
      }
    )
  }

  getAllTrainers(): void {
    this.databaseService.getAllTrainers().subscribe(trainers => {
      this.trainers = trainers;
    })
  }

  register() {
    let registerData: RegisterData = {
      name: this.registerForm.get('name')?.value,
      surname: this.registerForm.get('surname')?.value,
      email: this.registerForm.get('email')?.value,
      typeTraining: this.registerForm.get('typeTraining')?.value ? this.registerForm.get('typeTraining')?.value : null,
      trainer_id: this.registerForm.get('trainer')?.value ? parseInt(this.registerForm.get('trainer')?.value) : null,
    }
    this.auth.register(registerData)
  }

  get form() {
    return this.registerForm.controls
  }

  onSubmit():void {
    if (this.registerForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    console.log(JSON.stringify(this.registerForm.value, null, 5))
    this.register()
  }

  onReset() {
    this.registerForm.get('name')?.reset()
    this.registerForm.get('surname')?.reset()
    this.registerForm.get('phone')?.reset()
    this.registerForm.get('email')?.reset()
  }
}
