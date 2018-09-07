import { Component, OnInit, Input, ViewChild } from '@angular/core';
// import { MenuItem, cacheMenuService } from '/core/site-navigation/cache-menu.service';
import { CacheMenuService, MenuItem } from '../../../core/site-navigation/cache-menu.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateMenuComponent } from '../create-menus/create-menus.component';
import { UpdateMenusComponent } from '../update-menus/update-menus.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.scss']
})
export class ListMenusComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  displayedColumns: string[] = ['id', 'icon', 'title', 'description', 'path', 'actions'];
  dataSource: MatTableDataSource<MenuItem>;
  dialogRef: MatDialogRef<CreateMenuComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cacheMenuService: CacheMenuService, public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() { this.loadMenus();  }

  loadMenus() {
    this.cacheMenuService.getAll().then((menuItems: MenuItem[]) => {
      this.menuItems = menuItems;
      this.dataSource = new MatTableDataSource<MenuItem>(menuItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: number): void {
    // TODO: show a confirm dialog

    this.cacheMenuService.remove(id)
    .then(() => {
      // TODO: create method for refreshing datasource
      this.menuItems = this.menuItems.filter((menuItem) => menuItem.id !== id);
      this.dataSource = new MatTableDataSource<MenuItem>(this.menuItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  edit(menuItem) {
    this.dialog.open(UpdateMenusComponent, {
      data: menuItem
    }).afterClosed().subscribe(() => {
      this.loadMenus();
    });
  }

  newItem() {
    this.dialog.open(CreateMenuComponent, {
      data: {command: 'create'}
    }).afterClosed().subscribe(() => {
      this.loadMenus();
    });
  }

  makeCall() {
    return this.http.get<MenuItem>('https://www.google.com.br/search?q=Angular+api+service&oq=Angular+api+service').
    subscribe((response) => {
      console.log('Response:\t', response);
    });
  }

}



  /*{
    id?: number;
    title: string;
    description?: string;
    path: string;

    disable?: boolean;
    expanded?: boolean;
    icon?: string;
    iconUrl: string;
  }*/
