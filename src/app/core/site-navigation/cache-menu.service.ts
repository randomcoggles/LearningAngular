import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { DexieService } from '../dexie.service';

import seedLinks from './seed-links';

export interface MenuItem {
  id?: number;
  title: string;
  description?: string;
  path: string;
  disable?: boolean;
  expanded?: boolean;
  icon?: string;
  iconUrl?: string;
  showAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CacheMenuService {

  table: Dexie.Table<MenuItem, number>;
  private seedLinks: Array<MenuItem> = seedLinks;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('links');
    this.table.count().
    then(n => {
      if (n < 1 ) {
        this.seedLinks.forEach(item => this.table.add(item));
      }
    }).catch(ex => {
      console.log(ex);
    });
  }

  getAll() {
    return this.table.toArray();
  }

  getAppearAtComponentLis() {
    //return this.table.where;
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



