import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DatabaseService } from '../../database/database.service';
import { Customer } from '../../interfaces/customer';
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trainer } from '../../interfaces/trainer';
import Swal from 'sweetalert2';
import {AuthPassportService} from "../../database/auth-passport.service";



@Component({
  selector: 'admin-edit-customers',
  templateUrl: './admin-edit-customers.component.html',
  styleUrls: ['./admin-edit-customers.component.scss']
})
export class AdminEditCustomersComponent {
  isLogin: boolean = false;
  public selectedCustomer!: Customer;
  public trainers: Trainer[] = [];
  customerForm!: FormGroup;
  showInvalidSubmit: boolean = false

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private location: Location,
    private auth: AuthPassportService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getCustomerById();
    this.getAllTrainers();
    this.customerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
        email: ["", [Validators.required, Validators.email]],
        trainer_id: [""],
        typeTraining: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
      }
    )
  }

  get form() {
    return this.customerForm.controls
  }

  public getCustomerById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getCustomerById(id).subscribe(customer => {
        if (customer.trainer_id !== null) {
          this.databaseService.getTrainerByCustomer(customer.id).subscribe(trainer => {
            this.selectedCustomer = trainer;
            this.customerForm.get('trainer_id')?.setValue(trainer.trainer_id.toString());
          });
        } else {
          this.selectedCustomer = customer;
        }
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public goBack(): void {
    this.location.back();
  }

  public getAllTrainers(): void {
    this.databaseService.getAllTrainers().subscribe(trainers => {
      this.trainers = trainers;
    })
  }

  public onSubmit(): void {
    if (this.customerForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Seguro que quieres modificar el cliente?' + "</h5>",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Modificar',
      background: '#1F2937'
    }).then((result:any) => {
      if (result.isConfirmed) {
        const name = this.customerForm.get('name')?.value || '';
        const email = this.customerForm.get('email')?.value || '';
        const trainer_id_string = this.customerForm.get('trainer_id')?.value || '';
        const trainer_id: number = parseInt(trainer_id_string);
        const typeTraining = this.customerForm.get('typeTraining')?.value || '';

        const updatedCustomer: Customer = {
          ...this.selectedCustomer,
          name,
          email,
          trainer_id,
          typeTraining,
        };
        this.databaseService.updateCustomer(this.selectedCustomer.id, updatedCustomer).subscribe( _ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Modificado' + "</h5>",
            text: 'El cliente ha sido modificado',
            icon: 'success',
            background: '#1F2937'
          })
          this.location.back();
        })

      }
    })
  }


}
