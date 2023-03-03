import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import {Product} from "../interfaces/product";
import {ProductsGetAll} from "../interfaces/productsGetAll";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient
  ) { }

  public getAllProducts(): Observable<Product[]> {
    let url = this.API_URL + '/products';
    return this.http.get<ProductsGetAll>(url).pipe(
      map((data: ProductsGetAll) => {
        return data.data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }

  public getProductById(id: number): Observable<Product> {
    let url = this.API_URL + `/product`;
    if (id !== undefined) {
      url += `/${id}`
    }
    return this.http.get<ProductsGetAll>(url).pipe(
      map((data: ProductsGetAll) => {
        return data.data[0];
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public createProduct(image: File, product: Product): Observable<Product> {
    let url = this.API_URL + `/createProduct`;
    let formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('photo', image, image.name);

    return this.http.post<Product>(url, formData).pipe(
      map((data: Product) => {
        return data
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  public deleteProduct(id: number): Observable<Product> {
    let url = this.API_URL;
    if (id !== undefined) {
      url += `/deleteProduct/${id}`
    }
    return this.http.delete<Product>(url).pipe(
      catchError(e => {
        console.error(e);
        return [];
      })
    );
  }

  public updateProduct(id: number, product: Product, image: File): Observable<Product> {
    const formData = new FormData();
    formData.append('name', product.name)
    formData.append('description', product.description)
    formData.append('price', product.price)
    if (image === undefined) {
      formData.append('photo', product.photo)
    } else {
      formData.append('photo', image, image.name);
    }

    let url = this.API_URL + `/updateProduct`;
    if (id !== undefined) {
      url += `/${id}`;
    }

    return this.http.post<Product>(url, formData).pipe(
      map((data: Product) => {
        return data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

}
