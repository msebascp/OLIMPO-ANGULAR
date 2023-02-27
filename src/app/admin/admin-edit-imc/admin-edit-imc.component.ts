import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { DatabaseService } from 'src/app/database/database.service';
import { Customer } from 'src/app/interfaces/customer';
import { Trainer } from 'src/app/interfaces/trainer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-imc',
  templateUrl: './admin-edit-imc.component.html',
  styleUrls: ['./admin-edit-imc.component.scss']
})
export class AdminEditImcComponent {
  isLogin: boolean = false;
  public selectedCustomer!: Customer;
  imcForm!: FormGroup;
  showInvalidSubmit: boolean = false

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private auth: AuthPassportService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.auth.checkLoginTrainer().then((isLogin: any) => {
      if (isLogin) {
        this.isLogin = true;
        this.getCustomerById();
      }
    });
    this.imcForm = this.formBuilder.group(
      {
        name: ["", [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/)]],
      }
    )
  }

  public getCustomerById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getCustomerById(id).subscribe(customer => {
        this.selectedCustomer = customer;
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }


  public onSubmit(): void {
    if (this.imcForm.invalid) {
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
        const name = this.imcForm.get('name')?.value || '';
        const trainer_id_string = this.imcForm.get('trainer_id')?.value || '';
        const trainer_id: number = parseInt(trainer_id_string);
      }
    })
  }
}
