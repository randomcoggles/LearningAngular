import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('AppDB');
    window['myDB'] = this; // FIXME: remove this line
    this.version(1).stores({
      todos: '++id',
      checklistItems: '++id',
      tasks: '++id',
      links: '++id, title, order, showAt'
    });
  }
}
