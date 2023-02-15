import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthPassportService } from '../database/auth-passport.service';
import { DatabaseService } from '../database/database.service';

@Component({
  selector: 'app-admin-edit-post',
  templateUrl: './admin-edit-post.component.html',
  styleUrls: ['./admin-edit-post.component.scss']
})
export class AdminEditPostComponent {
  isLogin: boolean = false;

  constructor (
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private auth: AuthPassportService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.auth.checkLoginTrainer().then((isLogin: any) => {
      if (isLogin) {
        this.isLogin = true;
      }
    });
  }
}
