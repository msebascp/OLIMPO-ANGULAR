import { Component } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { DatabaseService } from '../database/database.service';
import { Trainer } from '../interfaces/trainer';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, empty, Observable, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent {
  public customersFound$: Observable<Customer[]> = of([]);
  public searchTerm: Subject<string> = new Subject();
  public customers: Customer[] = [];

  constructor (
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.getClientes();

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
            });
          }
        })
      });
  }

  public getClientes(): void {
    this.databaseService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      this.customers.forEach(customer => {
        if (customer.trainer_id !== null) {
          this.databaseService.getTrainerByCustomer(customer.id).subscribe(trainer => {
            const values = Object.values(trainer)[9];
            if (customer.trainer_id === values.id) {
              Object.assign(customer, { trainer: values });
            }
          });
        }
      })
      
    });
  }

  public search(value: string): void {
    //this.heroesFound$ = this.heroService.searchHeroes(value);
    this.searchTerm.next(value);
  }
}