import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Educacion } from '../interfaces/Educacion';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class EducacionApiService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  deleteEducacion(id: number): Observable<void> {
    return super.deleteItem("educacion/delete/", id);
  }

  getEducacion(): Observable<Educacion[]> {
      return super.getItems("public/get/educacion");
  }

  getEducacionById(id: number): Observable<Educacion> {
      return super.getItemById("public/get/educacion/", id);
  }

  newEducacion(educacion: Educacion) {
      return super.newItem("educacion/new", educacion);
  }

  updateEducacion(id: number, educacion: Educacion): Observable<void> {
    return super.updateItem("educacion/edit/", id, educacion);
  }

}
