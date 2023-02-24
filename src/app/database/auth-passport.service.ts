import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResponseToken} from "../interfaces/responseToken";
import {Observable, catchError, of, map, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {Trainings} from "../interfaces/trainings";
import {DataTrainings} from "../interfaces/dataTrainings";
import {RegisterData} from "../interfaces/registerData";
import { DataTrainer } from '../interfaces/dataTrainer';
import { Trainer } from '../interfaces/trainer';
import {RegisterTrainerData} from "../interfaces/registerTrainerData";

@Injectable({
  providedIn: 'root'
})
export class AuthPassportService {
  /**InfoAuth contiene la información sobre si el usuario está logueado o no, y si es un entrenador o no
   * Se ha usado BehaviorSubject por lo mismo que usamos Subject con el plus de que podemos darle
   * un valor por defecto*/
  private infoAuth = new BehaviorSubject<{ isLogin:boolean, isTrainer:boolean }>({isLogin: false, isTrainer: false});
  private url: string = 'http://localhost:8000/api';
  private options = {
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
    this.loadToken()
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
    this.loadToken()
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
    this.loadToken()
    console.log('Se ejecuta el check login de cliente');
    return new Promise((resolve, reject) => {
      this.http.get<ResponseToken>(`${this.url}/isLogin`, this.options)
        .pipe(catchError(error => {
          reject(error);
          return of(error.error as ResponseToken);
        }))
        .subscribe(
          data => {
            console.log('Esta es la response del check login de cliente: ' + data);
            /** Si el cliente está logueado:
             * 1: Si accede a una ruta accesible para clientes sigue su curso
             * 2: Si está en un login, se redirige al perfil del cliente
             * Si no está logueado e intenta acceder a una ruta de clientes se le redirige al login*/
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
    this.loadToken()
    console.log('Se ejecuta el check login de admin')
    return new Promise((resolve, reject) => {
      this.http.get<ResponseToken>(`${this.url}/trainer/isLogin`, this.options)
        .pipe(catchError(error => {
          reject(error);
          return of(error.error as ResponseToken);
        }))
        .subscribe(
          data => {
            console.log('Esta es la response del check login de entrenador: ' + data);
            /** Si el entrenador está logueado:
             * 1: Si accede a una ruta accesible para entrenadores sigue su curso
             * 2: Si está en un login, se redirige al perfil del entrenador
             * Si no está logueado e intenta acceder a una ruta de entrenador se le redirige al login*/
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
    this.loadToken()
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
    this.loadToken()
    console.log('El get Trainer by customer se ejecuta');
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
    this.loadToken()
    console.log('El get all trainers se ejecuta');
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

  register(registerData: RegisterData): Observable<ResponseToken> {
    console.log('El registro del cliente se ejecuta');
    console.log(registerData);
    return this.http.post<ResponseToken>(`${this.url}/register`, registerData, this.options)
  }

  registerTrainer(registerData: RegisterTrainerData): Observable<ResponseToken> {
    console.log('El registro del cliente se ejecuta');
    console.log(registerData);
    return this.http.post<ResponseToken>(`${this.url}/trainer/register`, registerData, this.options)
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

  loadToken() {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  }
}
