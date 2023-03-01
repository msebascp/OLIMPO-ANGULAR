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
  private API_URL = 'http://localhost:8000/api';

  getMedia(): Observable<Information[]> {
    return this.http.get<DataInformation>(this.API_URL + '/information').pipe(
      map((data: DataInformation) => {
        return data.data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    );
  }

  editMedia(id: number, media: Information): Observable<Information> {
    return this.http.post<Information>(this.API_URL + `/information/${id}?instagram=${media.instagram}&facebook=${media.facebook}&horario1=${media.horario1}&horario2=${media.horario2}`, media).pipe(
      map((data: Information) => {
        return data;
      }),
      catchError(e => {
        console.error(e);
        return [];
      }),
    )
  }

}
