import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../database/database.service';
import { Trainings } from '../../interfaces/trainings';
import {AuthPassportService} from "../../database/auth-passport.service";

@Component({
  selector: 'app-customer-trainings',
  templateUrl: './customer-trainings.component.html',
  styleUrls: ['./customer-trainings.component.scss']
})
export class CustomerTrainingsComponent {
  isLogin: boolean = false;
  public trainings: Trainings[] = [];

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private auth: AuthPassportService
  ) { }

  ngOnInit(): void {
    this.auth.getVariable().subscribe(infoAuth => {
      this.isLogin = infoAuth.isLogin
    })
    this.getAllTrainingsByCustomer()
  }

  /*public getAllTrainingsByCustomer() {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getAllTrainingsByCustomer(id).subscribe(trainings => {
        this.trainings = trainings;
      });
    }
  }*/

  public getAllTrainingsByCustomer() {
      this.auth.getAllTrainingsByCustomer().subscribe(trainings => {
        this.trainings = trainings;
      });
  }

  public downloadPDF(filename: string) {
    let name = filename.split('/');

    this.databaseService.downloadTraining(name[2])
      .subscribe(res => {
        const file = new Blob([res], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }
}
