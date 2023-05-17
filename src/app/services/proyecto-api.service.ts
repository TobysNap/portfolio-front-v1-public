import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Proyecto } from '../interfaces/Proyecto';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class ProyectoApiService extends ApiService {

  constructor(http: HttpClient) {
    super(http)
  }

  deleteProyecto(id: number): Observable<void> {
    return super.deleteItem("proyecto/delete/", id);
  }

  getProyecto(): Observable<Proyecto[]> {
      return super.getItems("public/get/proyecto");
  }

  getProyectoById(id: number): Observable<Proyecto> {
      return super.getItemById("public/get/proyecto/", id);
  }

  newProyecto(proyecto: Proyecto) {
      return super.newItem("proyecto/new", proyecto);
  }

  updateProyecto(id: number, proyecto: Proyecto): Observable<void> {
    return super.updateItem("proyecto/edit/", id, proyecto);
  }

}
