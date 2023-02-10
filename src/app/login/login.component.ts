import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {DatabaseService} from "../database/database.service";
import {AuthPassportService} from "../database/auth-passport.service";
import {data} from "autoprefixer";
import {Router} from "@angular/router";
import Swal from "sweetalert2";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  token: string = '';
  constructor(
    private auth: AuthPassportService,
    private router: Router
  ) {
  }

  login() {
    this.auth.login(this.email, this.password).subscribe(
      data  => {
        console.log(data);
        if (data.success) {
          this.token = data.data;
          console.log(this.token);
          localStorage.setItem('access_token', this.token);
          this.router.navigate(['/admin/account']);
        }
        else {
          Swal.fire(data.message);
        }
      }
    );
  }
}
