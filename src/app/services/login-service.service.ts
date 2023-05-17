import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Credentials } from '../interfaces/Credentials';
import { JwtDto } from '../interfaces/JwtDto';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  logged: boolean = false;
  apiUrl = `${environment.apiUrl}`;


  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    return localStorage.getItem('AuthToken');
  }

  login(creds: Credentials): Observable<JwtDto> {
    return this.http.post<JwtDto>(`${this.apiUrl}public/auth/login`, creds)
      .pipe(
        catchError(this.handleError)
      )
      
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem(TOKEN_KEY) === null) {
      this.logged = false;
      return false;
    } else {
      this.logged = true;
      return true;
    }
  }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      alert('Ha ocurrido un error:' + error.error);
    } else if(error.status === 401) {
      alert("Error 401: No autorizado. Revise los datos del formulario");
    } else {
      alert(
        `Error ${error.status}. La respuesta del error fue: ` + error.error);
    }
    return throwError(() => new Error('Algo malo sucedió; Intente nuevamente más tarde.'));
  }

}
