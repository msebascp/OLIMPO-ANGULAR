import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { Customer } from 'src/app/interfaces/customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-edit-account',
  templateUrl: './customer-edit-account.component.html',
  styleUrls: ['./customer-edit-account.component.scss']
})
export class CustomerEditAccountComponent {
  isLogin: boolean = false;
  selectedCustomer!: Customer;
  customerForm!: FormGroup;
  showInvalidSubmit: boolean = false;
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  image!: File;
  selectedImage: string = ''

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthPassportService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getCustomer()
    this.customerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        surname: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        email: ["", [Validators.required, Validators.email]],
      }
    )

  }

  get form() {
    return this.customerForm.controls
  }

  public getCustomer(): void {
    this.auth.dataCustomer().subscribe(customer => {
      this.selectedCustomer = customer
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
    if (this.customerForm.invalid) {
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
        const name = this.customerForm.get('name')?.value || '';
        const email = this.customerForm.get('email')?.value || '';
        const surname = this.customerForm.get('surname')?.value || '';
        const updatedCustomer: Customer = {
          ...this.selectedCustomer,
          name,
          surname,
          email,
        };
        updatedCustomer.photo = this.selectedCustomer.photo
        this.auth.updatedCustomer(updatedCustomer, this.image).subscribe(_ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Modificada' + "</h5>",
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
