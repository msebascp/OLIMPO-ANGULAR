import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthPassportService } from '../database/auth-passport.service';
import { debounceTime, distinctUntilChanged,  Observable, of, Subject, switchMap } from 'rxjs';
import { DatabaseService } from '../database/database.service';
import { Trainings } from '../interfaces/trainings';

@Component({
  selector: 'app-admin-edit-trainings',
  templateUrl: './admin-edit-trainings.component.html',
  styleUrls: ['./admin-edit-trainings.component.scss']
})
export class AdminEditTrainingsComponent {
  isLogin: boolean = false;
  public trainings: Trainings[] = [];
  
  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private auth: AuthPassportService
  ) { }

  ngOnInit(): void {
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
        this.getAllTrainingsByCustomer()
      }
    });
  }

  public getAllTrainingsByCustomer() {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id:number = +idString;
      this.databaseService.getAllTrainingsByCustomer(id).subscribe(trainings => {
        this.trainings = trainings;
      });
    }
  }

  public deleteTraining(id: number): void {

  }
}
