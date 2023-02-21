import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(
    private http: HttpClient
  ) {
  }
  instagram: string = 'instagram.com/olimpogymorihuela/'; // Declarar la propiedad y asignarle un valor inicial
  facebook: string = 'facebook.com/olimpogymorihuela/'; // Declarar la propiedad y asignarle un valor inicial

  mostrarValorInsta(): string {
    return this.instagram // Acceder al valor de la propiedad
  }

  editedText: string = '';
  editing: boolean = false;


  mostrarValorFacebook(): string {
    return this.facebook // Acceder al valor de la propiedad

  }
}


//variable para insta y face tipo string

// funcion para opterner
//función para edit

