import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResponseToken} from "../interfaces/responseToken";
import {Observable, catchError, of, map, Subject, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {Trainings} from "../interfaces/trainings";
import {DataTrainings} from "../interfaces/dataTrainings";
import {RegisterData} from "../interfaces/registerData";
import Swal from "sweetalert2";
import { DataTrainer } from '../interfaces/dataTrainer';
import { Trainer } from '../interfaces/trainer';

@Injectable({
  providedIn: 'root'
})
export class AuthPassportService {
  private infoAuth = new BehaviorSubject<{ isLogin:boolean, isTrainer:boolean }>({isLogin: false, isTrainer: false});
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
              this.sendVariable(data.data.isLogin, data.data.isTrainer);
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
              this.sendVariable(data.data.isLogin, data.data.isTrainer);
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

  logout(): void {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('El logout de clientes se ejecuta');
    this.http.get<ResponseToken>(`${this.url}/logout`, this.options)
      .subscribe(data => {
        console.log(data);
        this.sendVariable(false, false);
        this.router.navigate(['/home']);
      })
  }

  logoutTrainer():void {
    this.http.get<ResponseToken>(`${this.url}/trainer/logout`, this.options)
      .subscribe(data => {
        console.log(data);
        this.sendVariable(false, false);
        this.router.navigate(['/home']);
      })
  }

  getTrainerByCustomer(): Observable<Trainer> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('El getTrainer de clientes se ejecuta');
    return this.http.get<DataTrainer>(`${this.url}/customer/trainer`,this.options)
    .pipe(
      map((data: DataTrainer) => {
        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }

  getAllTrainingsByCustomer(): Observable<Trainings[]> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('El getTrainings de clientes se ejecuta');
    return this.http.get<DataTrainings>(`${this.url}/customer/trainings`,this.options)
    .pipe(
      map((data: DataTrainings) => {
        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }

  sendVariable(isLogin: boolean, isTrainer:boolean) {
    this.infoAuth.next({isLogin, isTrainer});
  }

  getVariable(): Observable<{ isLogin:boolean, isTrainer:boolean }> {
    return this.infoAuth.asObservable();
  }

  register(registerData: RegisterData): void {
    console.log('El registro del cliente se ejecuta');
    console.log(registerData);
    this.http.post<ResponseToken>(`${this.url}/register`, registerData, this.options)
      .pipe(
        catchError((error) => {
          let errorMessages = "";
          for (let key in error.error.errors) {
            errorMessages += error.error.errors[key].join(", ") + ', ';
          }
          if (!error.success) {
            Swal.fire({
              title: "<h5 style='color:white'>" + 'ERROR' + "</h5>",
              text: errorMessages,
              icon: 'error',
              background: '#1F2937'
            })
          }
          return of(error.error as ResponseToken);
        })
      )
      .subscribe(data => {
        console.log(data)
      })

  }

  pay(id:number):void {
    this.http.get<ResponseToken>(`${this.url}/customer/${id}/pay`, this.options)
      .subscribe(data => {
        console.log(data);
      })
  }

  dataTrainer(): Observable<Trainer> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    console.log('El getTrainings de clientes se ejecuta');
    return this.http.get<DataTrainer>(`${this.url}/trainer/me`,this.options)
    .pipe(
      map((data: DataTrainer) => {
        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }
}
