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
  luMiVi: string = '09:00 - 12:00 / 15:00 - 21:00';
  maJu: string = '17:00 - 21:00'

  mostrarValorInsta(): string {
    return this.instagram // Acceder al valor de la propiedad
  }

  editedText: string = '';
  editing: boolean = false;


  mostrarValorFacebook(): string {
    return this.facebook // Acceder al valor de la propiedad

  }

  mostrarValorLuMiVi() : string {
    return this.luMiVi
  }

  mostrarValormaJu() : string {
    return this.maJu
  }

}


//variable para insta y face tipo string

// funcion para opterner
//función para edit

