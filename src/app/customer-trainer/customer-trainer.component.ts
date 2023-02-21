import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthPassportService } from '../database/auth-passport.service';
import { DatabaseService } from '../database/database.service';
import { Trainer } from '../interfaces/trainer';

@Component({
  selector: 'app-customer-trainer',
  templateUrl: './customer-trainer.component.html',
  styleUrls: ['./customer-trainer.component.scss']
})
export class CustomerTrainerComponent {
  isLogin: boolean = false;
  public trainer?: Trainer;

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private auth: AuthPassportService
  ) { }

  ngOnInit(): void {
    this.auth.checkLogin().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
      }
    });
    this.getTrainerByCustomer()
  }

  public getTrainerByCustomer() {
    this.auth.getTrainerByCustomer().subscribe(trainer => {
      this.trainer = trainer;
    });
  }
}
