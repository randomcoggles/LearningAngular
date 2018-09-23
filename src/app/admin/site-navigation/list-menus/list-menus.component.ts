import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, Sort } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateMenusComponent } from '../update-menus/update-menus.component';
import { HttpClient } from '@angular/common/http';
import { CreateLinkComponent } from '../create-link/create-link.component';
import { LinkService, Link } from '../../../core/site-navigation/link.service';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrls: ['./list-menus.component.scss']
})
// TODO: Load items filtrered for by SideMenu item type
export class ListMenusComponent implements OnInit {
  @Input() links: Link[];
  displayedColumns: string[] = ['actions', 'order', 'icon', 'title', 'description', 'path', 'showAt'];
  dataSource: MatTableDataSource<Link>;
  dialogRef: MatDialogRef<CreateLinkComponent>;
  dataSourceIsLoading: Boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  serverSortParam = 'order,asc';

  constructor(private linkService: LinkService, public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() {
    this.loadMenus();

  }

  sortChange(sort: Sort) {
    this.serverSortParam = sort.active + ',' + sort.direction;
    this.loadMenus();
  }

  loadMenus() { // TODO: make it parameterized
    this.dataSourceIsLoading = true;
    this.linkService
    // .getAll()
    .get({params: {sort: this.serverSortParam}})
    .subscribe((links: Link[]) => {
      this.links = links;
      this.dataSource = new MatTableDataSource<Link>(this.links);
      this.dataSource.paginator = this.paginator;
      this.dataSourceIsLoading = false;
      this.dataSource.sort = this.sort;
    }, (error) => {
      // TODO: Show error to the user
      this.dataSourceIsLoading = false;
      console.log('[Links list] Error loading links!', error) ;
    });
  }

  delete(id): void {
    // TODO: show a confirm dialog
    this.linkService.delete(id)
    .subscribe(() => {
      // TODO: create method for refreshing datasource
      this.links = this.links.filter((link: Link) => link.id !== id);
      this.dataSource = new MatTableDataSource<Link>(this.links);
      this.dataSource.paginator = this.paginator;
    });
  }

  edit(item) {
    this.dialog.open(UpdateMenusComponent, {
      data: item,
      hasBackdrop: true
    }).afterClosed().subscribe(() => {
      this.loadMenus();
    });
  }

  newItem() {
    this.dialog.open(CreateLinkComponent, {
      data: {command: 'create'}, // FIXME: This is not being used(yet)
      hasBackdrop: true
    }).afterClosed().subscribe(() => {
      this.loadMenus();
    });
  }

  duplicate(item) {
    this.dialog.open(CreateLinkComponent, {
      data: {command: 'duplicate', item: item },
      hasBackdrop: true
    }).afterClosed().subscribe(() => {
      this.loadMenus();
    });
  }

}
