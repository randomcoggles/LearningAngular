import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { MatListModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CacheMenuService } from '../core/site-navigation/cache-menu.service';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule.forChild(routes),
  ],
  exports: [SideMenuComponent],
  declarations: [SideMenuComponent],
  providers: [ CacheMenuService ]
})
export class SideMenuModule { }
