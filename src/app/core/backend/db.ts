import Dexie from 'dexie';

export class DexieDb extends Dexie {
  constructor() {
    super('AppDB');
    this.version(1).stores({
      todos: '++id',
      checklistItems: '++id',
      tasks: '++id',
      links: '++id, title, order, showAt'
    });
  }
}
