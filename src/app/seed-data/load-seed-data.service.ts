import { Injectable } from '@angular/core';
import { DexieService } from '../core/dexie.service';
import { Link } from '../core/site-navigation/link.service';
import { Dexie } from 'dexie';
import { ChecklistItem } from '../checklist/checklist-item.service';

import seedLinks from './seed-links';
import seedCheckListItems from './seed-checklist-items';

@Injectable({
  providedIn: 'root'
})
export class LoadSeedDataService {
  linksTable: Dexie.Table<Link, number>;
  checkListItemTable: Dexie.Table<ChecklistItem, number>;

  constructor(private dbService: DexieService) {
    this.linksTable = dbService.table<Link>('links');
    this.checkListItemTable = dbService.table<Link>('checklistItems');
  }

  // TODO: Change this to get data from asstes folder via http
  createSeedData(): Promise<any> {
    let mustReload = false;
    let linksPromise, checkListItemsPromise;
    this.linksTable.hook('creating', function (primKey, obj, trans) {
      if ( typeof obj.order !== 'number' ) { obj.order = 999999; }
      obj.createdDate = new Date();
    });

    this.linksTable.hook('updating', function (newObj, primKey, obj, trans) {
      if ( typeof newObj['order'] !== 'number' ) { newObj['order'] = 999999; }
      newObj['lastUpdateDate'] = new Date();
    });

    this.linksTable.count().then(nItems => {
      if (nItems < 1) {
        mustReload = true;
        linksPromise = this.linksTable.bulkAdd(seedLinks.map(item => {
          return {
            'title': item.title,
            'description': item.description,
            'path': item.path,
            'disable': Boolean(item.disable),
            'expanded': Boolean(item.expanded),
            'icon': item.icon,
            'iconUrl': item.iconUrl,
            'order': Number(item.order),
            'createdDate': new Date(item.createdDate),
            'id': Number(item.id),
            'lastUpdateDate': new Date(item.lastUpdateDate),
            showAt: item.showAt
        } ;
        }));

        // console.log('Must reload application');
        // alert('Reload in 2 seconds...');
        const firstRunWithoutLinks = localStorage.getItem('firstRunWithoutLinks');
        if ( !firstRunWithoutLinks) {
          localStorage.setItem('firstRunWithoutLinks', 'true');
          setTimeout( () =>  location.reload(), 2000);
        }
      } else {
        linksPromise = Promise.resolve(true);
      }

    });

    this.checkListItemTable.hook('creating', function (primKey, obj, trans) {
      if ( typeof obj['order'] !== 'number' ) { obj['order'] = 999999; }
      obj['createdDate'] = new Date();
    });

    this.checkListItemTable.hook('updating', function (newObj, primKey, obj, trans) {
      if ( typeof newObj['order'] !== 'number' ) { newObj['order'] = 999999; }
      newObj['lastUpdateDate'] = new Date();
    });

    this.checkListItemTable.count().then(nItems => {
      if (nItems < 1) {
        checkListItemsPromise = this.checkListItemTable.bulkAdd(seedCheckListItems);
      } else {
        checkListItemsPromise = Promise.resolve(true);
      }
    });
    const allPromises = Promise.all([linksPromise, checkListItemsPromise]);
    return allPromises;
  }

  downloadDataBase() {
    this.dbService.tables.forEach(table => {
      table.toArray().then(response => {
        this.saveTableAsJSONFile(JSON.stringify(response, null, 3), table.name);
      });
    });
  }

  // TODO: Ask user to set download configs at (chrome://settings/content/automaticDownloads).
  private saveTableAsJSONFile(textToWrite, tableName): void {
    const textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    const fileNameToSaveAs = `${tableName}-json-backup-${new Date().getTime()}.json`;

    const downloadLink = document.createElement('a');
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = 'Download File';
    if (window['webkitURL'] != null) {
      // Chrome allows the link to be clicked
      // without actually adding it to the DOM.
      downloadLink.href = window['webkitURL'].createObjectURL(textFileAsBlob);
    } else {
      // Firefox requires the link to be added to the DOM
      // before it can be clicked.
      downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
      downloadLink.onclick = function(event) {
        document.body.removeChild(<HTMLElement>event.target);
      };
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
    }

    downloadLink.click();
  }
}
