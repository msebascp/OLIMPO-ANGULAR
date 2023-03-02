import {Injectable} from '@angular/core';
import {BasicResponse} from "../interfaces/BasicResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SweetAlertsService} from "./sweet-alerts.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private API_URL: string = 'http://localhost:8000/api';
  private options = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(
    private http: HttpClient,
    private alert: SweetAlertsService,
    private router: Router
  ) {
  }

  forgotPassword(email: string): void {
    console.log('Recuperando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/forgotPassword`,
      {email: email}, this.options)
      .subscribe(data => {
        console.log(data)
        if (data.success) {
          console.log(data.success)
          this.alert.basicTitleAlert(data.message)
        }
        console.log(data.message)
      })
  }

  resetPassword(password: string, token: string): void {
    console.log('Cambiando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/resetPassword`,
      {password: password, token: token}, this.options)
      .subscribe(data => {
        if (data.success) {
          this.alert.basicTitleAlert(data.message)
          this.router.navigate(['/login'])
        }
      })
  }

  forgotPasswordTrainer(email: string): void {
    console.log('Recuperando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/forgotPasswordTrainer`,
      {email: email}, this.options)
      .subscribe(data => {
        if (data.success) {
          this.alert.basicTitleAlert(data.message)
        }
      })
  }

  resetPasswordTrainer(password: string, token: string): void {
    console.log('Cambiando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/resetPasswordTrainer`,
      {password: password, token: token}, this.options)
      .subscribe(data => {
        if (data.success) {
          this.alert.basicTitleAlert(data.message)
          this.router.navigate(['/admin/login'])
        }
      })
  }

  changePassword(password: string): void {
    console.log('Cambiando contraseña');
    let optionsChangePassword = this.options
    optionsChangePassword.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    this.http.post<BasicResponse>(`${this.API_URL}/changePassword`,
      {password: password}, optionsChangePassword)
      .subscribe(data => {
        if (data.success) {
          this.alert.basicTitleAlert(data.message)
        }
      })
  }

  changePasswordTrainer(password: string): void {
    console.log('Cambiando contraseña');
    let optionsChangePassword = this.options
    optionsChangePassword.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    this.http.post<BasicResponse>(`${this.API_URL}/changePasswordTrainer`,
      {password: password}, optionsChangePassword)
      .subscribe(data => {
        if (data.success) {
          this.alert.basicTitleAlert(data.message)
        }
      })
  }
}
