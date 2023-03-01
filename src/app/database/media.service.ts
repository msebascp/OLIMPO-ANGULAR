import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Information } from '../interfaces/information';
import { DataInformation } from '../interfaces/dataInformation';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(
    private http: HttpClient
  ) { }


}
