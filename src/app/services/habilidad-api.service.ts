import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../interfaces/Habilidad';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class HabilidadApiService extends ApiService {

  constructor(http: HttpClient) {
    super(http)
  }

  deleteHabilidad(id: number): Observable<void> {
    return super.deleteItem("habilidad/delete/", id);
  }

  getHabilidad(): Observable<Habilidad[]> {
      return super.getItems("public/get/habilidad");
  }

  getHabilidadById(id: number): Observable<Habilidad> {
      return super.getItemById("public/get/habilidad/", id);
  }

  newHabilidad(habilidad: Habilidad) {
      return super.newItem("habilidad/new", habilidad);
  }

  updateHabilidad(id: number, habilidad: Habilidad): Observable<void> {
    return super.updateItem("habilidad/edit/", id, habilidad);
  }

}
