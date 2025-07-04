import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private jsonURL = 'https://briamcarrasco.github.io/json-api_cutsframe/usuarios.json';


  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {
    return this.http.get(this.jsonURL);
  }


}
