import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ResponseToken} from "../interfaces/response-token";
import {Observable, catchError, of, map} from "rxjs";
import {Router} from "@angular/router";
import {data} from "autoprefixer";

@Injectable({
  providedIn: 'root'
})
export class AuthPassportService {
  public options;
  private url: string = 'http://localhost:8000/api';
  private clientSecret: string = 'GOezWhY8FKrMOPH153HZGdymvomKWtrI1wDWY9d8';
  private clientId: number = 2;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
  }

  login(email: string, password: string): Observable<ResponseToken> {
    console.log('El login de auth service se ejecuta');
    return this.http.post<ResponseToken>(`${this.url}/login`, {
      grant_type: 'password',
      client_id: this.clientId,
      client_secret: this.clientSecret,
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

  isLoggedIn(): void {
    let params = new HttpParams();
    params = params.append('client_id', this.clientId.toString());
    params = params.append('client_secret', this.clientSecret);
    params = params.append('scope', '');
    this.http.get<ResponseToken>(`${this.url}/isLogin`, {headers: this.options.headers, params})
      .pipe(catchError(error => {
        return of(error.error as ResponseToken);
      }))
      .subscribe(
        data => {
          console.log(data);
          if (data.data.isLogin) {
            if (data.data.isTrainer) {
              if (this.router.url == '/login') {
                this.router.navigate(['/admin/account']);
              }
            } else {
              if (this.router.url == '/login') {
                this.router.navigate(['/customer/account']);
              }
            }
          } else {
            if (this.router.url != '/login') {
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }

  isTrainer(): Observable<ResponseToken> {
    let params = new HttpParams();
    params = params.append('client_id', this.clientId.toString());
    params = params.append('client_secret', this.clientSecret);
    params = params.append('scope', '');
    return this.http.get<ResponseToken>(`${this.url}/whoIam`, {headers: this.options.headers, params})
      .pipe(
        catchError(error => {
        return of(error.error as ResponseToken);
        }),
        map(data => {
          return data
        })
      )
  }
}
