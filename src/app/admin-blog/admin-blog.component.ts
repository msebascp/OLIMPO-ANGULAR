import { Component } from '@angular/core';
import {AuthPassportService} from "../database/auth-passport.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent {
  isLogin: boolean = false;
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }
  ngOnInit(){
    this.auth.checkLoginTrainer().then((isLogin) => {
      if (isLogin) {
        this.isLogin = true;
      }
    });
  }
}
