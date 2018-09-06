import { Injectable } from '@angular/core';
import { DexieService } from '../dexie.service';
import { Dexie } from 'dexie';

interface User {
  id?: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  table: Dexie.Table<User, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('users');
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
