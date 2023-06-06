import {Component} from '@angular/core';
import {AuthPassportService} from "../../database/auth-passport.service";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Trainer} from "../../interfaces/trainer";
import {DatabaseService} from "../../database/database.service";
import {RegisterData} from "../../interfaces/registerData";
import Swal from "sweetalert2";
import {Location} from "@angular/common";

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
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getAllTrainers()
    this.registerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        surname: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        email: ["", [Validators.required, Validators.email]],
        typeTraining: ["Ninguno", Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)],
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
      password: this.generatePassword()
    }
    this.auth.register(registerData)
      .subscribe({
        next: data => {
          if (data.success) {
            Swal.fire({
              title: "<h5 style='color:white'>" + 'Cliente registrado correctamente' + "</h5>",
              text: "La contraseña es: " + registerData.password,
              icon: 'success',
              background: '#1F2937'
            })
            this.onReset()
          }
        }
      })
  }

  get form() {
    return this.registerForm.controls
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    this.register()
  }

  onReset() {
    this.registerForm.get('name')?.reset()
    this.registerForm.get('surname')?.reset()
    this.registerForm.get('email')?.reset()
    this.registerForm.get('typeTraining')?.setValue('Ninguno')
    this.registerForm.get('trainer')?.setValue('')
  }

  public goBack(): void {
    this.location.back();
  }

  public generatePassword(): string {
    const allowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let password = ""
    let length = 8
    for (let i = 0; i < length; i++) {
      password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
    }
    return password
  }
}
