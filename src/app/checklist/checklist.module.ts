import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistComponent } from './checklist.component';
import { CreateChecklistItemComponent } from './create-checklist-item/create-checklist-item.component';
import { UpdateChecklistItemComponent } from './update-checklist-item/update-checklist-item.component';
import { ChecklistItemListComponent } from './checklist-item-list/checklist-item-list.component';
import { Routes, RouterModule } from '@angular/router';
import { ChecklistItemService } from './checklist-item.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatInputModule,
  MatCheckboxModule, MatButtonModule, MatIconModule,
  MatListModule, MatTableModule, MatPaginatorModule,
  MatDialogModule,
  MatToolbarModule
} from '@angular/material';

const routes: Routes = [
  {
    path: 'checklist',
    component: ChecklistComponent
  }, {
    path: 'checklist/list',
    component: ChecklistItemListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatToolbarModule,

    RouterModule.forChild(routes)
  ],
  declarations: [
    ChecklistComponent,
    ChecklistItemListComponent,
    CreateChecklistItemComponent,
    UpdateChecklistItemComponent
    ],
  providers: [ChecklistItemService],
  entryComponents: [CreateChecklistItemComponent, UpdateChecklistItemComponent]
})
export class ChecklistModule { }

