import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { DatabaseService } from 'src/app/database/database.service';
import { Customer } from 'src/app/interfaces/customer';
import { Payments } from 'src/app/interfaces/payments';
import { Location } from "@angular/common";

@Component({
  selector: 'app-admin-all-payments',
  templateUrl: './admin-all-payments.component.html',
  styleUrls: ['./admin-all-payments.component.scss']
})
export class AdminAllPaymentsComponent {
  isLogin: boolean = false;
  public payments: Payments[] = [];
  public selectedCustomer?: Customer;

  constructor(
    private databaseService: DatabaseService,
    private auth: AuthPassportService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getCustomerById();
  }

  public getCustomerById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getAllPaymentsById(id).subscribe(customer => {
        this.selectedCustomer = customer;
        this.payments = customer.payment;
        console.log(customer)
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public goBack(): void {
    this.location.back();
  }
}
