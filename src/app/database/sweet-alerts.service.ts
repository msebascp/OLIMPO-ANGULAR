import { Injectable } from '@angular/core';
import Swal from "sweetalert2";
import {Observable, Observer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SweetAlertsService {

  constructor() { }

  basicTitleAlert(title: string, text: string = '') {
    Swal.fire({
      title: "<h5 style='color:white'>" + title + "</h5>",
      text: text,
      icon: 'success',
      background: '#1F2937'
    })
  }

  confirmAlert(title: string, text: string = ''): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      Swal.fire({
        title: "<h5 style='color:white'>" + title + "</h5>",
        text: text,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Aceptar',
        background: '#1F2937'
      }).then((result) => {
        if (result.isConfirmed) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
