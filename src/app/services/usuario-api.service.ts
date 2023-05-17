import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Provincia, Usuario } from '../interfaces/Usuario';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService extends ApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  getUsuario(): Observable<Usuario> {
      return super.getItemById("public/get/usuario/", 1);
  }

  updateUsuario(usuario: Usuario): Observable<void> {
    return super.updateItem("usuario/edit/", 1, usuario)
  }

  getProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${super.apiUrl}provincias`)
  }

}
