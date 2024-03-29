import {Component} from '@angular/core';
import {Trainer} from "../../interfaces/trainer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthPassportService} from "../../database/auth-passport.service";
import {DatabaseService} from "../../database/database.service";
import Swal from "sweetalert2";
import {RegisterTrainerData} from "../../interfaces/registerTrainerData";
import {Location} from "@angular/common";

@Component({
  selector: 'app-register-trainer',
  templateUrl: './register-trainer.component.html',
  styleUrls: ['./register-trainer.component.scss']
})
export class RegisterTrainerComponent {
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
    this.registerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        surname: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        email: ["", [Validators.required, Validators.email]],
        specialty: ["Ninguno", Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)],
      }
    )
  }

  register() {
    let registerData: RegisterTrainerData = {
      name: this.registerForm.get('name')?.value,
      surname: this.registerForm.get('surname')?.value,
      email: this.registerForm.get('email')?.value,
      specialty: this.registerForm.get('typeTraining')?.value ? this.registerForm.get('typeTraining')?.value : null,
      password: this.generatePassword()
    }
    this.auth.registerTrainer(registerData)
      .subscribe({
        next: data => {
          if (data.success) {
            Swal.fire({
              title: "<h5 style='color:white'>" + 'Entrenador registrado correctamente' + "</h5>",
              text: "La contraseña es: " + registerData.password ,
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
    this.registerForm.get('specialty')?.reset()
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
