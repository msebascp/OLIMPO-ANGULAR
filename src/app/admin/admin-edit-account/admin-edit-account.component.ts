import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DatabaseService } from '../../database/database.service';
import { Location } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Trainer } from '../../interfaces/trainer';
import Swal from 'sweetalert2';
import { AuthPassportService } from 'src/app/database/auth-passport.service';





@Component({
  selector: 'admin-edit-account',
  templateUrl: './admin-edit-account.component.html',
  styleUrls: ['./admin-edit-account.component.scss']
})
export class AdminEditAccountComponent {
  isLogin: boolean = false;
  public editTrainer: Trainer = { id: 0, name: '', surname: '', email: '', specialty: '', photo: '', customer: [] };
  public selectedTrainer !: Trainer

  trainerForm!: FormGroup
  showInvalidSubmit: boolean = false;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  public image!: File;
  public selectedImage: string = ''

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthPassportService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getTrainer()
    this.trainerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        surname: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        email: ["", [Validators.required, Validators.email]],
        specialty: ["Ninguna", Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)],
      }
    )

  }

  get form() {
    return this.trainerForm.controls
  }

  public getTrainer(): void {
    this.auth.dataTrainer().subscribe(trainer => {
      this.selectedTrainer = trainer
    })
  }

  public goBack(): void {
    this.location.back();
  }

  public changeImg(): void {
    this.fileInput.nativeElement.click();
  }

  public onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.image = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
    }
  }

  public onSubmit(): void {
    if (this.trainerForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Seguro que quieres modificar tu cuenta?' + "</h5>",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Modificar',
      background: '#1F2937'
    }).then((result: any) => {

      if (result.isConfirmed) {
        const name = this.trainerForm.get('name')?.value || '';
        const surname = this.trainerForm.get('surname')?.value || '';
        const email = this.trainerForm.get('email')?.value || '';
        const specialty = this.trainerForm.get('specialty')?.value || '';

        this.editTrainer = {
          ...this.selectedTrainer,
          name,
          surname,
          email,
          specialty,
        };
        this.editTrainer.photo = this.selectedTrainer.photo
        this.auth.updatedTrainer(this.editTrainer, this.image).subscribe(_ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Modificado' + "</h5>",
            text: 'Tu cuenta ha sido modificada',
            icon: 'success',
            background: '#1F2937'
          })
          this.location.back();
        })

      }
    })
  }

}
