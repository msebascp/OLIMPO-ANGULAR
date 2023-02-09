import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ResponseToken} from "../interfaces/response-token";
import {Observable, map, throwError, catchError, of} from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthPassportService {
  public options;
  private url: string = 'http://localhost:8000/api';
  private clientSecret: string = 'gXsruBiUc34cPT6XTPaYVfTUq57ZyjfXHzpdBhNE';
  private clientId: number = 8;

  constructor(
    private http: HttpClient
  ) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
  }

  login(email:string, password:string): Observable<ResponseToken> {
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
        return of(error.error as ResponseToken);
      })
    );
  }
}
