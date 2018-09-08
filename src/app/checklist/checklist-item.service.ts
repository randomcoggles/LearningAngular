import { Injectable } from '@angular/core';
import { Dexie } from 'dexie';
import { DexieService } from '../core/dexie.service';
import seedData from './seed-data';
export interface ChecklistItem {
  id?: number;
  title: string;
  description?: string;
  done?: boolean;
}

@Injectable()
export class ChecklistItemService {

  table: Dexie.Table<ChecklistItem, number>;
  private seedData: Array<ChecklistItem> = seedData;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('checklistItems');
  }

  getAll() {
    return this.table.toArray();
  }

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
