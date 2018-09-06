import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { DexieService } from '../core/dexie.service';


export interface MenuItem {
  id?: number;
  title: string;
  description?: string;
  path: string;
  disable?: boolean;
  expanded?: boolean;
  icon?: string;
  iconUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CacheMenuService {

  table: Dexie.Table<MenuItem, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('todos');
  }

  getAll() {
    return this.table.toArray();
  }

  save(menuItems: MenuItem[]) {

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

}



