import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { DexieService } from '../dexie.service';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Link {
  id?: number;
  title: string;
  description?: string;
  path: string;
  disable?: boolean;
  expanded?: boolean;
  icon?: string;
  iconUrl?: string;
  appearAtComponent: string;
}

@Injectable({
  providedIn: 'root'
})
export class LinkService extends BaseService {

  table: Dexie.Table<Link, number>;

  constructor(private dexieService: DexieService, http: HttpClient) {
    super(http, '/api/links');
    this.table = this.dexieService.table('todos');
  }

  getAll(): Observable<Link[]> {
    return this.get<Link>(this.baseUrl);
  }

  getById(id: number): Observable<Link> {
    return this.get<Link>(this.baseUrl + '/' + id)[0];
  }


  /*
  getAll() {
    return this.table.toArray();
  }

  getAppearAtComponentLis() {
    //return this.table.where;
  }

  save(links: Link[]) {

  }
// ===========================



  add(data) {
    return this.table.add(data);
  }

  update(id, data) {
    return this.table.update(id, data);
  }

  remove(id) {
    return this.table.delete(id);
  }
  */

}





