import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCustomer } from '../interfaces/dataCustomer';
import { DataTrainer } from '../interfaces/dataTrainer';
import { catchError, map, Observable, of } from 'rxjs';
import { Customer } from '../interfaces/customer';
import { Trainer } from '../interfaces/trainer';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = 'http://localhost:8000/api';

  public getAllCustomers(): Observable<Customer[]> {
    let url = this.API_URL + '/customers';
    return this.http.get<DataCustomer>(url).pipe(
      map((data: DataCustomer) => {
        return data.data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getCustomerById(id: number): Observable<Customer> {
    let url = this.API_URL + `/customers`;
    if (id !== undefined) {
      url += `?id=${id}`
    }
    return this.http.get<DataCustomer>(url).pipe(
      map((data: DataCustomer) => {
        return data.data[0];
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getAllTrainers(): Observable<Trainer[]> {
    let url = this.API_URL + '/trainers';
    return this.http.get<DataTrainer>(url).pipe(
      map((data: DataTrainer) => {
        console.log(data)
        return data.data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getTrainerByCustomer(id: number): Observable<Trainer[]> {
    let url = this.API_URL + `/customers`;
    if (id !== undefined) {
      url += `/${id}/trainers`
    }
    return this.http.get<DataTrainer>(url).pipe(
      map((data: DataTrainer) => {
        return data.data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public searchCustomers(text: string): Observable<Customer[]> {
    let url = this.API_URL + `/customers/search`;
    if (!text.trim()) {
      return of([]);
    }
    let params = new HttpParams().set('limit', 5);
    if (text) {
      params = params.set('name[value]', text);
    }
    return this.http.get<Customer[]>(url, {params});
  }
}

