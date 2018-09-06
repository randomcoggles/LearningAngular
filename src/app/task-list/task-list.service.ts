import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import Dexie from 'dexie';
import { DexieService } from '../core/dexie.service';

export interface Task {
  title: string;
  done: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  table: Dexie.Table<Task, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('tasks');
  }

  list<T>(): Observable<Array<T>> {
    return of([]);
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
