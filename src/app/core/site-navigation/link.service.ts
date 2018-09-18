import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { DexieService } from '../dexie.service';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import seedLinks from './seed-links';
import { tap, catchError } from 'rxjs/operators';

export interface Link {
  id?: number;
  title: string;
  description?: string;
  path: string;
  disable?: boolean;
  expanded?: boolean;
  icon?: string;
  iconUrl?: string;
  showAt?: string;
  order?: number;
  createdDate?: Date;
  lastUpdateDate?: Date;
}

enum LinkTypes {
  SidMenu = 'side-menu',
  Footer = 'footer',
  TopNav = 'top-navigation'
}

@Injectable({
  providedIn: 'root'
})
export class LinkService extends BaseService {

  table: Dexie.Table<Link, number>;
  private seedLinks: Array<Link> = seedLinks;

  constructor(private dexieService: DexieService, http: HttpClient) {
    super(http, 'links');
  }

  getAll<link>(): Observable<Link[]> {
    return this.get<Link>().pipe(
      tap(links => of(links['results'])),
      catchError(this.handleError('getAll links', []))
    );
  }

  add(data) {
    // return this.table.add(data);
    return this.post<Link>('', data);
  }

  // TODO: move this method o base class
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  log(msg) {
    console.log(msg);
  }

}





