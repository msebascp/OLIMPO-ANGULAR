import {Injectable} from '@angular/core';
import {BasicResponse} from "../interfaces/BasicResponse";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
  ) {
  }

  forgotPassword(email: string): void {
    console.log('Recuperando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/forgotPassword`,
      {email: email}, this.options)
      .subscribe(data => {
        console.log(data);
      })
  }

  resetPassword(password: string, token: string): void {
    console.log('Cambiando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/resetPassword`,
      {password: password, token: token}, this.options)
      .subscribe(data => {
        console.log(data);
      })
  }

  forgotPasswordTrainer(email: string): void {
    console.log('Recuperando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/forgotPasswordTrainer`,
      {email: email}, this.options)
      .subscribe(data => {
        console.log(data);
      })
  }

  resetPasswordTrainer(password: string, token: string): void {
    console.log('Cambiando contraseña');
    this.http.post<BasicResponse>(`${this.API_URL}/resetPasswordTrainer`,
      {password: password, token: token}, this.options)
      .subscribe(data => {
        console.log(data);
      })
  }
}
