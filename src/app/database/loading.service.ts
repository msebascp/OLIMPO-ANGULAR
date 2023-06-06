import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading$ = new BehaviorSubject<boolean>(false)
  constructor() { }

  show():void {
    this.isLoading$.next(true)
  }
  hide():void {
    this.isLoading$.next(false)
  }

  getVariable(): Observable<boolean> {
    return this.isLoading$;
  }
}
