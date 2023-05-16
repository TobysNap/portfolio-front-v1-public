import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    protected apiUrl = `${environment.apiUrl}`;

    constructor(
        protected http: HttpClient
    ) {}

    deleteItem(deleteUrl: string, id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${deleteUrl}${id}`);
    }

    getItems(getUrl: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}${getUrl}`);
    }

    getItemById(getUrl: string, id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}${getUrl}${id}`);
    }

    newItem(postUrl: string, item: unknown): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}${postUrl}`, item);
    }

    updateItem(putUrl: string, id: number, item: unknown): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}${putUrl}${id}`, item)
    }

}
