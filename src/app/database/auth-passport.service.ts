import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResponseToken} from "../interfaces/responseToken";
import {Observable, catchError, of, map, BehaviorSubject, forkJoin} from "rxjs";
import {Router} from "@angular/router";
import {Trainings} from "../interfaces/trainings";
import {DataTrainings} from "../interfaces/dataTrainings";
import {RegisterData} from "../interfaces/registerData";
import {DataTrainer} from '../interfaces/dataTrainer';
import {Trainer} from '../interfaces/trainer';
import {RegisterTrainerData} from "../interfaces/registerTrainerData";
import {Customer} from '../interfaces/customer';
import {DataCustomers} from '../interfaces/dataCustomers';

@Injectable({
  providedIn: 'root'
})
export class AuthPassportService {
  /**InfoAuth contains the information about whether the user is logged in or not, and whether he is a trainer or not
   * BehaviorSubject has been used for the same reason that we use Subject with the plus that we can give it
   * a default value*/
  private infoAuth = new BehaviorSubject<{ isLogin: boolean, isTrainer: boolean }>({isLogin: false, isTrainer: false});
  private url: string = 'http://localhost:8000/api';
  private options = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    })
  };

  private options2 = {
    headers: new HttpHeaders({
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
    return this.http.post<ResponseToken>(`${this.url}/trainer/login`, {
      email: email,
      password: password,
    }, this.options).pipe(
      catchError((error) => {
        console.log(error.error);
        return of(error.error as ResponseToken);
      })
    );
  }

  logout(): void {
    this.loadToken()
    this.http.get<ResponseToken>(`${this.url}/logout`, this.options)
      .subscribe(data => {
        this.sendVariable(false, false);
        this.router.navigate(['/home']);
      })
  }

  logoutTrainer(): void {
    this.http.get<ResponseToken>(`${this.url}/trainer/logout`, this.options)
      .subscribe(data => {
        this.sendVariable(false, false);
        this.router.navigate(['/home']);
      })
  }

  getTrainerByCustomer(): Observable<Trainer> {
    this.loadToken()
    console.log('El get Trainer by customer se ejecuta');
    return this.http.get<DataTrainer>(`${this.url}/customer/trainer`, this.options)
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
    return this.http.get<DataTrainings>(`${this.url}/customer/trainings`, this.options)
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

  sendVariable(isLogin: boolean, isTrainer: boolean) {
    this.infoAuth.next({isLogin, isTrainer});
  }

  getVariable(): Observable<{ isLogin: boolean, isTrainer: boolean }> {
    return this.infoAuth.asObservable();
  }

  register(registerData: RegisterData): Observable<ResponseToken> {
    return this.http.post<ResponseToken>(`${this.url}/register`, registerData, this.options)
  }

  registerTrainer(registerData: RegisterTrainerData): Observable<ResponseToken> {
    return this.http.post<ResponseToken>(`${this.url}/trainer/register`, registerData, this.options)
  }

  pay(id: number): void {
    this.http.get<ResponseToken>(`${this.url}/customer/${id}/pay`, this.options)
  }

  dataTrainer(): Observable<Trainer> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<DataTrainer>(`${this.url}/trainer/me`, this.options)
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

  updatedTrainer( trainer: Trainer, image: File): Observable<Trainer> {
    this.loadToken()
    let url = this.url + `/trainer/editAccount`;
    const formData: FormData = new FormData();
    formData.append('name', trainer.name);
    formData.append('surname', trainer.surname);
    formData.append('email', trainer.email);
    formData.append('specialty', trainer.specialty);

    if (image === undefined) {
      formData.append('photo', trainer.photo)
    } else {
      formData.append('photo', image, image.name);
    }

    return this.http.post<Trainer>(url, formData, this.options2).pipe(
      map((data: Trainer) => {
        return data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  updatedCustomer( customer: Customer, image: File): Observable<Customer> {
    this.loadToken()
    let url = this.url + `/customer/editAccount`;


    const formData: FormData = new FormData();
    formData.append('name', customer.name);
    formData.append('surname', customer.surname);
    formData.append('email', customer.email);

    if (image === undefined) {
      formData.append('photo', customer.photo)
    } else {
      formData.append('photo', image, image.name);
    }

    return this.http.post<Customer>(url, formData, this.options2).pipe(
      map((data: Customer) => {
        return data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  loadToken() {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
  }

  dataCustomer(): Observable<Customer> {
    this.options.headers = this.options.headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
    return this.http.get<DataCustomers>(`${this.url}/customer/me`, this.options)
      .pipe(
        map((data: DataCustomers) => {
          return data.data[0]

        }),
        catchError(e => {
          console.error(e);
          return [];
        }),
      )
  }

  checkLogin2(): Observable<{ isLogin: boolean, isTrainer: boolean }> {
    this.loadToken()
    return this.http.get<ResponseToken>(`${this.url}/isLogin`, this.options)
      .pipe(
        map(data => {
            return {isLogin: data.data.isLogin, isTrainer: data.data.isTrainer}
          }
        )
      )
  }

  checkLoginTrainer2(): Observable<{ isLogin: boolean, isTrainer: boolean }> {
    this.loadToken()
    return this.http.get<ResponseToken>(`${this.url}/trainer/isLogin`, this.options)
      .pipe(
        map(data => {
            return {isLogin: data.data.isLogin, isTrainer: data.data.isTrainer}
          }
        )
      )
  }

  checkDouble(): Observable<{ isLogin: boolean, isTrainer: boolean }> {
    return forkJoin([
      this.checkLoginTrainer2(),
      this.checkLogin2()
    ]).pipe(
      map(([data1, data2]) => {
        if (data1.isLogin && data1.isTrainer) {
          return { isLogin: true, isTrainer: true };
        } else {
          return data2;
        }
      })
    );
  }

  endPointCustomer(): void {
    this.loadToken()
    console.log('El endPoint de clientes se ejecuta');
    this.http.get<ResponseToken>(`${this.url}/endPoint`, this.options)
      .subscribe(data => {
        console.log(data);
        this.sendVariable(false, false);
        this.router.navigate(['/home']);
      })
  }

  endPointTrainer(): void {
    this.loadToken()
    console.log('El endPoint de entrenadores se ejecuta');
    this.http.get<ResponseToken>(`${this.url}/endPointTrainer`, this.options)
      .subscribe(data => {
        console.log(data);
        this.sendVariable(false, false);
        this.router.navigate(['/home']);
      })
  }
}
