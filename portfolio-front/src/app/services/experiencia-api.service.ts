import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Experiencia } from '../interfaces/Experiencia';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaApiService extends ApiService {

  constructor(http: HttpClient) {
    super(http)
  }

  deleteExperiencia(id: number): Observable<void> {
    return super.deleteItem("experiencia/delete/", id);
  }

  getExperiencia(): Observable<Experiencia[]> {
      return super.getItems("public/get/experiencia");
  }

  getExperienciaById(id: number): Observable<Experiencia> {
      return super.getItemById("public/get/experiencia/", id);
  }

  newExperiencia(experiencia: Experiencia) {
      return super.newItem("experiencia/new", experiencia);
  }

  updateExperiencia(id: number, experiencia: Experiencia): Observable<void> {
    return super.updateItem("experiencia/edit/", id, experiencia);
  }

}
