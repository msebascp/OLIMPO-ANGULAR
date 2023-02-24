import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { Customer } from 'src/app/interfaces/customer';
import { Trainer } from 'src/app/interfaces/trainer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-edit-account',
  templateUrl: './customer-edit-account.component.html',
  styleUrls: ['./customer-edit-account.component.scss']
})
export class CustomerEditAccountComponent {
  isLogin: boolean = false;
  public selectedCustomer!: Customer;
  public trainers: Trainer[] = [];

  customerForm!: FormGroup;
  showInvalidSubmit: boolean = false

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private auth: AuthPassportService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.checkLogin().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
        this.getCustomer()
      }
    });
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

  public onSubmit(): void {
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
        this.auth.updatedCustomer(updatedCustomer).subscribe(_ => {
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
