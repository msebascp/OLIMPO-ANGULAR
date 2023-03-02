import { Component } from '@angular/core';
import { Customer } from '../../interfaces/customer';
import { DatabaseService } from '../../database/database.service';
import { debounceTime, distinctUntilChanged,  Observable, of, Subject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { Trainings } from '../../interfaces/trainings';
import {AuthPassportService} from "../../database/auth-passport.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  public customersFound$: Observable<Customer[]> = of([]);
  public searchTerm: Subject<string> = new Subject();
  public customers: Customer[] = [];
  public allCustomers: Customer[] = [];
  public pdfFile!: File;
  public newDatePayment!: string;
  public training: Trainings = {id: 0, name : 'Entrenamiento prueba', pdfTraining: '', id_customer: 1}

  isLogin: boolean = false;
  showFilterOptions:boolean = false
  paid:boolean = false
  noPaid:boolean = false
  today!:Date;

  constructor(
    private databaseService: DatabaseService,
    private auth: AuthPassportService
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.today = new Date();
    console.log(this.today.getTime())
    this.getClientes()
    this.searchCustomers()
  }

  public getClientes(): void {
    this.databaseService.getAllCustomers().subscribe(customers => {
      this.customers = []
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
            let latestPayment = payments.payment[payments.payment.length -1];
            if (latestPayment.customer_id === customer.id) {
              for (let i = 0; i < this.customers.length; i++) {
                if (this.customers[i].id === customer.id) {
                  this.customers[i].lastPayment = latestPayment;
                }
              }
            }
          }
        })        
      })
      this.allCustomers = this.customers
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
        // Recogemos el 'id' que tiene el boton
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

  onFileChange(event: any, customer_id: number) {
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

  saveTraining() {
    this.databaseService.savePdf( this.pdfFile, this.training)
      .subscribe(_ => {
        Swal.fire({
          title: "<h5 style='color:white'>" + 'Subido' + "</h5>",
          text: 'Entrenamiento guardado correctamente',
          icon: 'success',
          background: '#1F2937'
        })
      })
  }

  filterPaidCustomers() {
    this.paid = !this.paid
    this.noPaid = false
    if(this.paid) {
      this.customers = this.allCustomers.filter( customer => {
        customer.nextPayment = new Date(customer.nextPayment)
        return customer.nextPayment.getTime() > this.today.getTime()
      })
    } else {
      this.customers = this.allCustomers
    }
  }

  filterNoPaidCustomers() {
    this.noPaid = !this.noPaid
    this.paid = false
    if(this.noPaid) {
      this.customers = this.allCustomers.filter( customer => {
        customer.nextPayment = new Date(customer.nextPayment)
        return customer.nextPayment.getTime() <= this.today.getTime()
      })
    } else {
      this.customers = this.allCustomers
    }
  }

  pay(id: number) {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Seguro que quieres añadir un pago del cliente?' + "</h5>",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Sí',
      background: '#1F2937'
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.auth.pay(id)
        Swal.fire({
          title: "<h5 style='color:white'>" + 'Pago realiazado correctamente' + "</h5>",
          icon: 'success',
          background: '#1F2937'
        })
        this.getClientes()
      }
    })
  }

  paymentEdit(id:number, event: Event) {
    let button = event.target as HTMLElement
    let box = button!.parentElement!.parentElement!.parentElement as HTMLElement
    let boxInfo = box.firstChild as HTMLElement
    boxInfo.style.display = 'none'
    let boxEdit = box.lastChild as HTMLElement
    boxEdit.style.display = 'flex'
  }

  confirmEdit(id:number, event: Event, confirm: boolean) {
    if (confirm){
      Swal.fire({
        title: "<h5 style='color:white'>" + 'Confirmar cambios' + "</h5>",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Sí',
        background: '#1F2937'
      }).then((result) => {
        if (result.isConfirmed) {
          this.databaseService.updatePayment(id,  this.newDatePayment).subscribe(
            data  => {
              console.log(data)
              if (data.success) {
                this.getClientes()
              }
            },
            error => {
              console.log(error)
            },
          )
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Fecha cambiada correctamente' + "</h5>",
            icon: 'success',
            background: '#1F2937'
          })
        }
      })
    }
    let button = event.target as HTMLElement
    let box = button!.parentElement!.parentElement!.parentElement as HTMLElement
    let boxInfo = box.firstChild as HTMLElement
    boxInfo.style.display = 'flex'
    let boxEdit = box.lastChild as HTMLElement
    boxEdit.style.display = 'none'
  }
}
