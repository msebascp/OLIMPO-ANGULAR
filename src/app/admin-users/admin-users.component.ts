import { Component } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { DatabaseService } from '../database/database.service';
import { debounceTime, distinctUntilChanged,  Observable, of, Subject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Trainings } from '../interfaces/trainings';
import {AuthPassportService} from "../database/auth-passport.service";
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  public customersFound$: Observable<Customer[]> = of([]);
  public searchTerm: Subject<string> = new Subject();
  public customers: Customer[] = [];
  public pdfFile!: File;
  public training: Trainings = {id: 0, name : 'Entrenamiento prueba', pdfTraining: '', id_customer: 1}
  isLogin: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private auth: AuthPassportService
  ) { }

  ngOnInit(): void {
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
        this.getClientes();
        this.searchCustomers();
      }
    });
  }

  public getClientes(): void {
    this.databaseService.getAllCustomers().subscribe(customers => {
      //this.customers = customers;
      customers.forEach(customer => {
        if (customer.trainer_id !== null) {
          this.databaseService.getTrainerByCustomer(customer.id).subscribe(trainer => {
            this.customers.push(trainer);
          });
        } else {
          this.customers.push(customer);
        }
        this.databaseService.getPaymentByCustomer(customer.id).subscribe(payments => {
          if (payments.payment.length !== 0) {
            let payment = payments.payment[payments.payment.length -1];
            if (payment.customer_id === customer.id) {
              for (let i = 0; i < this.customers.length; i++) {
                if (this.customers[i].id === customer.id) {
                  this.customers[i].payment = [
                    ...(this.customers[i].payment || []),
                    payment,
                  ];
                }
              }
            }
          }
        })
      })
    })
  }

  public searchCustomers() {
    this.customersFound$.subscribe(customersFound => {
      this.customers = customersFound;
    });

    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // completa el observable anterior y devuelve otro observable
      switchMap(term => {
        if (term === '') {
          this.getClientes();
        }
        return this.databaseService.searchCustomers(term)
      })
    ).subscribe(customersFound => {
      this.customers = customersFound;

      this.customers.forEach(customer => {
        if (customer.trainer_id !== null) {
          this.databaseService.getTrainerByCustomer(customer.id).subscribe(trainer => {
            const values = Object.values(trainer)[9];
            if (customer.trainer_id === values.id) {
              Object.assign(customer, { trainer: values });
            }
            this.databaseService.getPaymentByCustomer(customer.id).subscribe(payments => {
              if (payments.payment.length !== 0) {
                let payment = payments.payment[payments.payment.length -1];
                if (payment.customer_id === customer.id) {
                  for (let i = 0; i < this.customers.length; i++) {
                    if (this.customers[i].id === customer.id) {
                      this.customers[i].payment = [
                        ...(this.customers[i].payment || []),
                        payment,
                      ];
                    }
                  }
                }
              }
            })
          });
        }
      })
    });

  }


  public search(value: string): void {
    //this.heroesFound$ = this.heroService.searchHeroes(value);
    this.searchTerm.next(value);
  }

  public deleteCustomer(id: number): void {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Quieres eliminar el cliente?' + "</h5>",
      text: 'No podrás revertirlo',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Borrar',
      background: '#1F2937'
    }).then((result:any) => {
      if (result.isConfirmed) {
        // Recogemos el id que tiene el boton
        this.databaseService.deleteCustomer(id).subscribe( _ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Borrado' + "</h5>",
            text: 'El cliente ha sido borrado',
            icon: 'success',
            background: '#1F2937'
          })
          this.customers = this.customers.filter(customer => customer.id !== id);
          this.getClientes();
        });
      }
    })
  }


  public onFileChange(event: any, customer_id: number) {
    this.pdfFile = event.target.files[0];

    if (this.pdfFile.type !== 'application/pdf') {
      Swal.fire({
        title: 'El archivo seleccionado no es un PDF. Por favor, seleccione un archivo PDF.',
        color: 'white',
        icon: 'error',
        background: '#1F2937',
      })
      return;
    }
    this.training.name = this.pdfFile.name;
    this.training.id_customer = customer_id
  }


  public saveTraining() {
    this.databaseService.savePdf( this.pdfFile, this.training)
      .subscribe(data => {
        Swal.fire({
          title: "<h5 style='color:white'>" + 'Subido' + "</h5>",
          text: 'Entrenamiento guardado correctamente',
          icon: 'success',
          background: '#1F2937'
        })
      })
  }
}
