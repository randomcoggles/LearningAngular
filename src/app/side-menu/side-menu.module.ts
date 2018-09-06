import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { MatListModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { MenuService } from './menu.service';
import { CreateMenuComponent } from './management/create/create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   { path: 'todos', component: TodosComponent }
// ];

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
    // RouterModule.forChild(routes),
  ],
  exports: [SideMenuComponent],
  declarations: [SideMenuComponent, CreateMenuComponent],
  providers: [ MenuService ]
})
export class SideMenuModule { }
