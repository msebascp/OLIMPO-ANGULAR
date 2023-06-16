import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shopping } from '../interfaces/shopping';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(id_customer: number): Observable<Shopping[]> {
    let url = this.API_URL + '/productsShopping/' + id_customer;
    return this.http.get<{ success: boolean; message: string; data: Shopping[] }>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  public createProduct( id_product: number, id_customer: number): Observable<Shopping> {
    let url = this.API_URL + `/createProductShopping`;
    let formData = new FormData();
    formData.append('id_product', id_product.toString());
    formData.append('id_customer', id_customer.toString());
    return this.http.post<Shopping>(url, formData).pipe(
      map((data: Shopping) => {
        return data
      })
    );
  }

  public deleteProduct(id: number): Observable<Shopping> {
    let url = this.API_URL;
    if (id !== undefined) {
      url += `/deleteProductShopping/${id}`
    }
    return this.http.delete<Shopping>(url)
  }

  public deleteProductByIdProduct(id: number): Observable<Shopping> {
    let url = this.API_URL;
    if (id !== undefined) {
      url += `/deleteShoppingByIdProduct/${id}`
    }
    return this.http.delete<Shopping>(url)
  }

  public updateProduct(id: number, cantidad: number): Observable<Shopping> {
    const formData = new FormData();
    formData.append('cantidad', cantidad.toString())
    let url = this.API_URL + `/updateProductShopping`;
    if (id !== undefined) {
      url += `/${id}`;
    }

    return this.http.post<Shopping>(url, formData).pipe(
      map((data: Shopping) => {
        return data;
      })
    );
  }
}
