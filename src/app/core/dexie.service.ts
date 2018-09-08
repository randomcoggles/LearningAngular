import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('AppDB');
    this.version(1).stores({
      todos: '++id',
      menuItems: '++id',
      checklistItems: '++id',
      tasks: '++id',
      links: '++id'
    });
  }
}
