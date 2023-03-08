import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataCustomer } from '../interfaces/dataCustomer';
import { catchError, map, Observable, of } from 'rxjs';
import { Customer } from '../interfaces/customer';
import { Trainer } from '../interfaces/trainer';
import { DataCustomers } from '../interfaces/dataCustomers';
import { DataTrainers } from '../interfaces/DataTrainers';
import { Trainings } from '../interfaces/trainings';
import { DataTrainings } from '../interfaces/dataTrainings';
import { Blog } from '../interfaces/blog';
import { DataBlogs } from '../interfaces/dataBlogs';
import {BasicResponse} from "../interfaces/BasicResponse";
import { Payments } from '../interfaces/payments';
import { DataPayments } from '../interfaces/dataPayments';
import { ImcRecord } from '../interfaces/imcRecord';


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
    return this.http.get<DataCustomers>(url).pipe(
      map((data: DataCustomers) => {
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
      url += `/${id}`
    }
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

  public getAllTrainers(): Observable<Trainer[]> {
    let url = this.API_URL + '/trainers';
    return this.http.get<DataTrainers>(url).pipe(
      map((data: DataTrainers) => {
        return data.data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getTrainerByCustomer(id: number): Observable<Customer> {
    let url = this.API_URL + `/customers`;
    if (id !== undefined) {
      url += `/${id}/trainers`
    }
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

  public deleteImcRecord(id: number): Observable<ImcRecord> {
    return this.http.delete<ImcRecord>(this.API_URL+`/imcRecords/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return [];
      })
    );
  }

  public createIMCcalculation(imcForm: ImcRecord): Observable<ImcRecord> {
    let url = this.API_URL + `/imcRecords?height=${imcForm.height}&weight=${imcForm.weight}&imc=${imcForm.imc}&customer_id=${imcForm.customer_id}`
  
    return this.http.post<ImcRecord>(url, imcForm).pipe(
      map((data: ImcRecord) => {
        return data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getImcrecordByCustomer(id: number): Observable<Customer> {
    let url = this.API_URL + `/customers`;
    if (id !== undefined) {
      url += `/${id}/imcRecords`
    }
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

  public deleteCustomer(id: number): Observable<Customer> {
    return this.http.delete<Customer>(this.API_URL + `/customers` + `/${id}`).pipe(
      catchError(e => {
        console.error(e);
        return [];
      })
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

  public updateCustomer(id: number, customer: Customer): Observable<Customer> {
    let url = this.API_URL + `/customers`;
    if (id !== undefined) {
      url += `/${id}?name=${customer.name}&typeTraining=${customer.typeTraining}&trainer_id=${customer.trainer_id}&email=${customer.email}`
    }
    return this.http.post<DataCustomer>(url, customer).pipe(
      map((data: DataCustomer) => {
        return data.data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getPaymentByCustomer(id: number): Observable<Customer> {
    let url = this.API_URL + `/customers`;
    if (id !== undefined) {
      url += `/${id}/payments`
    }
    return this.http.get<DataCustomer>(url).pipe(
      map((data: DataCustomer) => {
        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }

  public savePdf(pdf: File, training: Trainings): Observable<Trainings> {
    const formData = new FormData();
    formData.append('pdfTraining', pdf, pdf.name);
    formData.append('name', training.name);
    formData.append('id_customer', training.id_customer.toString());

    let url = this.API_URL + '/savePdf';
    return this.http.post<Trainings>(url, formData).pipe(
      map((data: Trainings) => {
        return data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public deleteTraining(id: number): Observable<Trainings> {
    let url = this.API_URL + '/trainings';
    if (id !== undefined) {
      url += `/${id}`
    }
    return this.http.delete<Trainings>(url).pipe(
      catchError(e => {
        console.error(e);
        return [];
      })
    )
  }

  public getAllTrainingsByCustomer(id: number): Observable<Trainings[]> {
    let url = this.API_URL + `/customers`;
    if (id !== undefined) {
      url += `/${id}/trainings`
    }
    return this.http.get<DataTrainings>(url).pipe(
      map((data: DataTrainings) => {
        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }

  public downloadTraining(fileName: string): Observable<any> {
    let url = this.API_URL + `/customers/download/pdf/${fileName}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  public createPost(image: File, post: Blog): Observable<Blog> {
    let url = this.API_URL + `/blog/createPost`;
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('photo', image, image.name);

    return this.http.post<Blog>(url, formData).pipe(
      map((data: Blog) => {
        return data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public getAllPosts(): Observable<Blog[]> {
    let url = this.API_URL + '/blog';
    return this.http.get<DataBlogs>(url).pipe(
      map((data: DataBlogs) => {

        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }

  public getPostById(id: number): Observable<Blog> {
    let url = this.API_URL + `/blog`;
    if (id !== undefined) {
      url += `/${id}`
    }
    return this.http.get<DataBlogs>(url).pipe(
      map((data: DataBlogs) => {
        return data.data[0];
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public updatePost(id: number, post: Blog, image: File): Observable<Blog> {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    if (image === undefined) {
      formData.append('photo', post.photo)
    } else {
      formData.append('photo', image, image.name);
    }

    let url = this.API_URL + `/blog`;
    if (id !== undefined) {
      url += `/${id}`;
    }

    return this.http.post<Blog>(url, formData).pipe(
      map((data: Blog) => {
        return data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public deletePost(id: number): Observable<Blog> {
    let url = this.API_URL + `/blog`;
    if (id !== undefined) {
      url += `/deletePost/${id}`
    }
    return this.http.delete<Blog>(url).pipe(
      catchError(e => {
        console.error(e);
        return [];
      })
    );
  }

  public updatePayment(id: number, date: string): Observable<BasicResponse> {
    let headers = new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    return this.http.post<BasicResponse>(this.API_URL + `/payments/${id}/update`, {'date': date}, { headers: headers })
  }

  public getAllPaymentsById(id: number): Observable<Customer> {
    return this.http.get<DataCustomer>(this.API_URL + `/customers/${id}/payments`).pipe(
      map((data: DataCustomer) => {
        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }
}

