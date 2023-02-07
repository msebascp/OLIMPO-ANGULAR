import { Component } from '@angular/core';
import { Customer } from '../interfaces/customer';
import { DatabaseService } from '../database/database.service';
import { Trainer } from '../interfaces/trainer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent {

  public customers: Customer[] = [];

  constructor (
    private databaseService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  public getClientes(): void {
    this.databaseService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      this.customers.forEach(customer => {
        if (customer.trainer_id !== null) {
          this.databaseService.getTrainerByCustomer(customer.id).subscribe(trainer => {
            const values = Object.values(trainer)[7];
            if (customer.trainer_id === values.id) {
              Object.assign(customer, { trainer: values });
            }
          });
        }
      })
    });
  }
}