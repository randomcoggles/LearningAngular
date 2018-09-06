import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

constructor() { }

  list<T>(): Observable<Array<T>> {
  // list<Array<T> >(): Observable<Array<T>> {
    return  of([]);
  }
}
