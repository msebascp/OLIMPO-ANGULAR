import {Component} from '@angular/core';
import {Customer} from '../../interfaces/customer';
import {DatabaseService} from '../../database/database.service';
import {debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap} from 'rxjs';
import Swal from 'sweetalert2';
import {Trainings} from '../../interfaces/trainings';
import {AuthPassportService} from "../../database/auth-passport.service";
import {SweetAlertsService} from "../../database/sweet-alerts.service";
import {LoadingService} from "../../database/loading.service";

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
  public training: Trainings = {id: 0, name: 'Entrenamiento prueba', pdfTraining: '', id_customer: 1}
  public showInactiveCustomers: boolean = false
  isLogin: boolean = false;
  showFilterOptions: boolean = false
  today!: Date;

  constructor(
    private databaseService: DatabaseService,
    private auth: AuthPassportService,
    private alerts: SweetAlertsService
  ) {
  }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.today = new Date()
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
            let latestPayment = payments.payment[payments.payment.length - 1];
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
              Object.assign(customer, {trainer: values});
            }
          })
        }
        this.databaseService.getPaymentByCustomer(customer.id).subscribe(payments => {
          if (payments.payment.length !== 0) {
            let latestPayment = payments.payment[payments.payment.length - 1];
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
    });

  }

  public search(value: string): void {
    //this.heroesFound$ = this.heroService.searchHeroes(value);
    this.searchTerm.next(value);
  }

  public deleteCustomer(id: number): void {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Quieres dar de baja al cliente?' + "</h5>",
      text: 'Sí podrás revertirlo',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Dar de baja',
      background: '#1F2937'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Recogemos el 'id' que tiene el boton
        this.databaseService.deleteCustomer(id).subscribe(_ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Dado de baja' + "</h5>",
            text: 'El cliente ha sido dado de baja',
            icon: 'success',
            background: '#1F2937'
          })
          this.customers = this.customers.filter(customer => customer.id !== id);
          this.getClientes();
        });
      }
    })
  }

  public activeCustomer(id: number): void {
    Swal.fire({
      title: "<h5 style='color:white'>" + '¿Quieres dar de alta al cliente?' + "</h5>",
      text: 'Sí podrás revertirlo',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Dar de alta',
      background: '#1F2937'
    }).then((result: any) => {
      if (result.isConfirmed) {
        // Recogemos el 'id' que tiene el boton
        this.databaseService.activeCustomer(id).subscribe(_ => {
          Swal.fire({
            title: "<h5 style='color:white'>" + 'Dado de alta' + "</h5>",
            text: 'El cliente ha sido dado de alta',
            icon: 'success',
            background: '#1F2937'
          })
          this.showInactiveCustomers = false
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
    this.databaseService.savePdf(this.pdfFile, this.training)
      .subscribe(_ => {
        Swal.fire({
          title: "<h5 style='color:white'>" + 'Subido' + "</h5>",
          text: 'Entrenamiento guardado correctamente',
          icon: 'success',
          background: '#1F2937'
        })
      })
  }

  filterActiveCustomers() {
    this.showInactiveCustomers = false
    this.customers = this.allCustomers.filter(customer => {
      return customer.active
    })
  }

  filterPaidCustomers() {
    this.showInactiveCustomers = false
    this.customers = this.allCustomers.filter(customer => {
      customer.nextPayment = new Date(customer.nextPayment)
      return customer.nextPayment.getTime() > this.today.getTime()
    })
  }

  filterNoPaidCustomers() {
    this.showInactiveCustomers = false
    this.customers = this.allCustomers.filter(customer => {
      customer.nextPayment = new Date(customer.nextPayment)
      return customer.nextPayment.getTime() <= this.today.getTime()
    })
  }

  filterDownAccountCustomers() {
    this.showInactiveCustomers = true
    this.customers = this.allCustomers.filter(customer => {
      return !customer.active
    })
  }

  pay(id: number) {
    this.alerts.confirmAlert('¿Seguro que quieres añadir un pago al cliente?').subscribe(
      data => {
        if (data) {
          this.auth.pay(id).subscribe(
            data => {
              if (data.success) {
                this.getClientes()
                this.alerts.basicAlert(data.message)
              }
            }
          )
        }
      }
    )
  }

  paymentEdit(id: number, event: Event) {
    let button = event.target as HTMLElement
    let box = button!.parentElement!.parentElement!.parentElement as HTMLElement
    let boxInfo = box.firstChild as HTMLElement
    boxInfo.style.display = 'none'
    let boxEdit = box.lastChild as HTMLElement
    boxEdit.style.display = 'flex'
  }

  confirmEdit(id: number, event: Event, confirm: boolean) {
    if (confirm) {
      this.alerts.confirmAlert('Confirmar cambios').subscribe(
        data => {
          if (data) {
            this.databaseService.updatePayment(id, this.newDatePayment).subscribe(
              data => {
                if (data.success) {
                  this.getClientes()
                }
              },
              error => {
                console.log(error)
              },
            )
            this.alerts.basicAlert('Fecha cambiada correctamente')
          }
        }
      )
    }
    let button = event.target as HTMLElement
    let box = button!.parentElement!.parentElement!.parentElement as HTMLElement
    let boxInfo = box.firstChild as HTMLElement
    boxInfo.style.display = 'flex'
    let boxEdit = box.lastChild as HTMLElement
    boxEdit.style.display = 'none'
  }

  hide() {
    setTimeout(() => {
      this.showFilterOptions = false
    }, 100);
  }
}
