import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Categoria {
    id: number;
    nombre: string;
    descripcion: string;
  }

@Injectable({
  providedIn: 'root'
})

  
export class CategoriaService {

  private jsonURl = "https://briamcarrasco.github.io/json-api_cutsframe/categoria.json";
  private localkey = "categoria";

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.jsonURl);
  }



}
