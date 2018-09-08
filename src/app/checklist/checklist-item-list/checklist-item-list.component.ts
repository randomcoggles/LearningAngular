import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateChecklistItemComponent } from '../create-checklist-item/create-checklist-item.component';
import { HttpClient } from '@angular/common/http';
import { UpdateChecklistItemComponent } from '../update-checklist-item/update-checklist-item.component';
import { ChecklistItem, ChecklistItemService } from '../checklist-item.service';
@Component({
  selector: 'app-checklist-list',
  templateUrl: './checklist-item-list.component.html',
  styleUrls: ['./checklist-item-list.component.scss']
})
export class ChecklistItemListComponent implements OnInit {

  @Input() checklistItems: ChecklistItem[];
  displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  dataSource: MatTableDataSource<ChecklistItem>;
  dialogRef: MatDialogRef<CreateChecklistItemComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private checklistItemService: ChecklistItemService, public dialog: MatDialog, private http: HttpClient) { }

  ngOnInit() { this.loadItems();  }

  loadItems() {
    this.checklistItemService.getAll().then((checklistItems: ChecklistItem[]) => {
      this.checklistItems = checklistItems;
      this.dataSource = new MatTableDataSource<ChecklistItem>(checklistItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: number): void {
    // TODO: show a confirm dialog

    this.checklistItemService.remove(id)
    .then(() => {
      // TODO: create method for refreshing datasource
      this.checklistItems = this.checklistItems.filter((checklistItem) => checklistItem.id !== id);
      this.dataSource = new MatTableDataSource<ChecklistItem>(this.checklistItems);
      this.dataSource.paginator = this.paginator;
    });
  }

  edit(checklistItem) {
    this.dialog.open(UpdateChecklistItemComponent, {
      data: checklistItem,
      hasBackdrop: true
    }).afterClosed().subscribe(() => {
      this.loadItems();
    });
  }

  newItem() {
    this.dialog.open(CreateChecklistItemComponent, {
      data: {command: 'create'},
      hasBackdrop: true
    }).afterClosed().subscribe(() => {
      this.loadItems();
    });
  }

}
