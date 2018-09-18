import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
/**@class BaseService
 * Exetend your services
 */
export class BaseService {
  // TODO: check if , httpOptions is applicable to all thttp requests.
  constructor(private http: HttpClient, public baseUrl: string ) {}

  // TODO: Warn request without limit param.
  get<T>(httpOptions?: {}): Observable<T[]> {
    return this.http.get<T[]>(environment.apiUrl + this.baseUrl, httpOptions )
    .pipe(map( val => {
      if ( val && val['results'] ) {
        return val['results'];
      }
      return val;
    }));
  }

  getById<T>(id: number, httpOptions?: {}): Observable<T> {
    return this.http.get<T>(environment.apiUrl + this.baseUrl + '/' + id, httpOptions);
  }

  post<T>(body: any, httpOptions?: {}): Observable<T> {
    return this.http.post<T>(environment.apiUrl + this.baseUrl, body, httpOptions);
  }

  update<T>(body: any, httpOptions?: {}): Observable<T> {
    return this.put<T>(body, httpOptions);
  }

  create<T>(body: T, httpOptions?: {}): Observable<T> {
    return this.post<T>(body, httpOptions);
  }

  put<T>(body: T, httpOptions?: {}): Observable<T> {
    return this.http.put<T>(environment.apiUrl + this.baseUrl, body, httpOptions);
  }

  delete<T>(id: number): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + this.baseUrl + '/' + id );
  }

  patch<T>(url: string, body: any, httpOptions?: {}): Observable<T> {
    return this.http.patch<T>(environment.apiUrl + this.baseUrl + url || '', body, httpOptions);
  }
}
