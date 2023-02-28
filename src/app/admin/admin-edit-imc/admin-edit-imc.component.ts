import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthPassportService } from 'src/app/database/auth-passport.service';
import { DatabaseService } from 'src/app/database/database.service';
import { Customer } from 'src/app/interfaces/customer';
import { ImcRecord } from 'src/app/interfaces/imcRecord';
import { Location } from "@angular/common";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-imc',
  templateUrl: './admin-edit-imc.component.html',
  styleUrls: ['./admin-edit-imc.component.scss']
})
export class AdminEditImcComponent {
  isLogin: boolean = false;
  public selectedCustomer!: Customer;
  public allImcRecord: ImcRecord [] = [];
  public imcRecords: ImcRecord [] = [];
  public imcRecord: ImcRecord = {id: 0, weight: 50, height: 150, imc:0, weighing_date: new Date, customer_id: 0};
  imcForm!: FormGroup;
  showInvalidSubmit: boolean = false;
  public intervalId:any = null;
  today!:Date;

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private auth: AuthPassportService,
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getImcRecordById();
    this.today = new Date();
    this.imcForm = this.formBuilder.group(
      {
        weight: [Validators.required],
        height: [Validators.required]
      }
    )
  }

  get form() {
    return this.imcForm.controls
  }

  public getImcRecordById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getImcrecordByCustomer(id).subscribe(customer => {
        this.selectedCustomer = customer;
        this.allImcRecord = customer.imc_record;
        this.filterLastImcRecord();
        this.getAllRecordsById()
      });

    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public getAllRecordsById(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getImcrecordByCustomer(id).subscribe(customer => {
        this.imcRecords = customer.imc_record;
      });
    } else {
      console.error("No se ha encontrado el parámetro 'id' en la ruta");
    }
  }

  public filterLastImcRecord(): void {
    let closestDifference = Infinity;
    this.allImcRecord.filter(imc => {
      const weighingDate = new Date(imc.weighing_date); // Convertimos a tipo Date
      const difference = Math.abs(weighingDate.getTime() - this.today.getTime());
      if (difference < closestDifference) {
        closestDifference = difference;
        this.imcRecord = imc;
      }
    });
  }

  public deleteImcRecord(): void {
    this.databaseService.deleteImcRecord(this.selectedCustomer.id).subscribe( _ => {
      this.getImcRecordById();
    })
  }


  public onSubmit(): void {
    if (this.imcForm.invalid) {
      this.showInvalidSubmit = true
      return;
    }
    const weight_string = this.imcForm.get('weight')?.value || '';
    const weight: number = parseInt(weight_string);
    const height_string = this.imcForm.get('height')?.value || '';
    const height: number = parseInt(height_string);

    const imc = Math.round(weight / ((height / 100) * (height / 100)));
    this.imcRecord.customer_id = this.selectedCustomer.id;

    const newImcForm: ImcRecord = {
      ...this.imcRecord,
      height,
      weight,
      imc
    };
    this.databaseService.createIMCcalculation(newImcForm).subscribe( _ => {
      this.getImcRecordById();
    })
  }

  public sumarPeso(): void {
    this.imcRecord.weight++;
  }

  public restarPeso(): void {
    this.imcRecord.weight--;
  }

  public sumarAltura(): void {
    this.imcRecord.height++;
  }

  public restarAltura(): void {
    this.imcRecord.height--;
  }

  public startIncrementPeso() {
    this.intervalId = setInterval(() => {
      this.imcRecord.weight += 5;
    }, 170);
  }

  public stopIncrementPeso() {
    clearInterval(this.intervalId);
  }

  public startLessPeso() {
    this.intervalId = setInterval(() => {
      this.imcRecord.weight -= 5;
    }, 170);
  }

  public stopLessPeso() {
    clearInterval(this.intervalId);
  }

  public startIncrementAltura() {
    this.intervalId = setInterval(() => {
      this.imcRecord.height += 5;
    }, 170);
  }

  public stopIncrementAltura() {
    clearInterval(this.intervalId);
  }

  public startLessAltura() {
    this.intervalId = setInterval(() => {
      this.imcRecord.height -= 5;
    }, 170);
  }

  public stopLessAltura() {
    clearInterval(this.intervalId);
  }

  public borrar(): void {
    this.imcRecord.height = 150;
    this.imcRecord.weight = 50;
  }

  public goBack(): void {
    this.location.back();
  }
}
