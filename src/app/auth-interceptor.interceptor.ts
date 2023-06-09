import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import Swal from "sweetalert2";
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          Swal.fire(error.error.message);
        } else if (error.status === 422) {
          let errorMessages = "";
          for (let key in error.error.errors) {
            errorMessages += error.error.errors[key] + ' ';
          }
          Swal.fire({
            title: "<h5 style='color:white'>" + errorMessages + "</h5>",
            icon: 'error',
            background: '#1F2937'
          })
        }
        return throwError(error)
      })
    )
  }
}
