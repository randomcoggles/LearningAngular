import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteNavigationComponent } from './site-navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { ListMenusComponent } from './list-menus/list-menus.component';
import { CacheMenuService } from '../../core/site-navigation/cache-menu.service';
import { CreateMenuComponent } from './create-menus/create-menus.component';
import { CreateLinkComponent } from './create-link/create-link.component';
import { UpdateMenusComponent } from './update-menus/update-menus.component';
import { HttpClientModule } from '@angular/common/http';
import { LinkService } from '../../core/site-navigation/link.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin/site-navigation',
    component: ListMenusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,

    RouterModule.forChild(routes)
  ],
  declarations: [SiteNavigationComponent, ListMenusComponent, CreateMenuComponent,
    CreateLinkComponent,
    UpdateMenusComponent
],
  exports: [SiteNavigationComponent],
  providers: [
    LinkService,
    CacheMenuService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },

  ],
  entryComponents: [CreateMenuComponent, UpdateMenusComponent]

})
export class SiteNavigationModule { }