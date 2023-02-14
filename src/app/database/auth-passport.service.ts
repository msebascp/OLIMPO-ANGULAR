import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResponseToken} from "../interfaces/response-token";
import {Observable, catchError, of, map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthPassportService {
  private url: string = 'http://localhost:8000/api';
  public options = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
  };
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  login(email: string, password: string): Observable<ResponseToken> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('El login de clientes se ejecuta');
    return this.http.post<ResponseToken>(`${this.url}/login`, {
      grant_type: 'password',
      email: email,
      password: password,
      scope: ''
    }, this.options).pipe(
      catchError((error) => {
        console.log(error.error);
        return of(error.error as ResponseToken);
      })
    );
  }

  loginTrainer(email: string, password: string): Observable<ResponseToken> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('El login de admins se ejecuta');
    return this.http.post<ResponseToken>(`${this.url}/trainer/login`, {
      grant_type: 'password',
      email: email,
      password: password,
      scope: ''
    }, this.options).pipe(
      catchError((error) => {
        console.log(error.error);
        return of(error.error as ResponseToken);
      })
    );
  }

  checkLogin(): Promise<boolean> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('check login cliente');
    return new Promise((resolve, reject) => {
      this.http.get<ResponseToken>(`${this.url}/isLogin`, this.options)
        .pipe(catchError(error => {
          reject(error);
          return of(error.error as ResponseToken);
        }))
        .subscribe(
          data => {
            console.log(data);
            if (data.data.isLogin) {
              if (this.router.url == '/login' || this.router.url == '/admin/login') {
                this.router.navigate(['/customer/account']);
              }
              resolve(true);
            } else {
              if (this.router.url != '/login' && this.router.url != '/admin/login') {
                this.router.navigate(['/login']);
              }
              resolve(false);
            }
          }
        )
    });
  }

  checkLoginTrainer(): Promise<boolean> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('check login admin');
    return new Promise((resolve, reject) => {
      this.http.get<ResponseToken>(`${this.url}/trainer/isLogin`, this.options)
        .pipe(catchError(error => {
          reject(error);
          return of(error.error as ResponseToken);
        }))
        .subscribe(
          data => {
            console.log(data);
            if (data.data.isLogin) {
              if (this.router.url == '/admin/login' || this.router.url == '/login') {
                this.router.navigate(['/admin/account']);
              }
              resolve(true);
            } else {
              if (this.router.url != '/admin/login' && this.router.url != '/login') {
                this.router.navigate(['/admin/login']);
              }
              resolve(false);
            }
          }
        )
    });
  }
/**
  obtainInfo():{isLogin:boolean, isTrainer:boolean} {
    return {
      "isLogin": this.isLogin,
      "isTrainer": this.isTrainer
    }
  }

  setInfo(isLogin:boolean,  isTrainer:boolean):void {
    this.isLogin = isLogin;
    this.isTrainer = isTrainer;
  }
 */
}
