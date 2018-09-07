import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/**@class BaseService
 * Exetend your services
 */
export class BaseService {

  constructor(private http: HttpClient, public baseUrl: string = environment.apiUrl) {}

  get<T>(url: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl + url);
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body);
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + url);
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(this.baseUrl + url, body);
  }
}
