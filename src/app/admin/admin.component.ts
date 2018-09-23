import { Component, OnInit } from '@angular/core';
import { LoadSeedDataService } from '../seed-data/load-seed-data.service';
import { LinkService } from '../core/site-navigation/link.service';
import { HttpParams } from '@angular/common/http';
import { Link } from '../core/backend/apis/links/index';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  links: Link[];
  linksAreLoading: Boolean;

  constructor(private loadSeedDataService: LoadSeedDataService, public linkService: LinkService) {
    window['admin'] = this; // TODO: remove this debugging line
   }

  backupData() {
    this.loadSeedDataService.downloadDataBase();
  }

  ngOnInit() {
    this.linksAreLoading = true;
    this.linkService
      .get({params: {sort: 'order,asc', filter: 'showAt eq admin-page'}})
      .subscribe((links: Link[]) => {
        this.linksAreLoading = false;
        this.links = links;
      }, error => {
        console.log(error);
        this.linksAreLoading = false;
      });
  }

  search() {
    const httpParams = new HttpParams();
    httpParams.set('order', 'order,desc');
    httpParams.set('order', 'order,desc');
    this.linkService.get({params: {sort: 'order,desc', limit: 100}, withCredentials: true})
    .subscribe(result => {
      console.log('Search result:\t', result);
    });
  }
}
