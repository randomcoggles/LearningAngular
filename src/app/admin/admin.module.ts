import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { UserComponent } from '../core/user/user.component';
import { ExampleTableComponent } from '../example-table/example-table.component';
import { MatCardModule, MatProgressBarModule } from '@angular/material';
import { DataManagementComponent } from './data-management/data-management.component';
import { AlertModule } from '../shared/alert/alert.module';
import { ApiManagementComponent } from './api-management/api-management.component';

const routes: Routes  = [
  {
    path: 'admin',
    component: AdminComponent
  }, {
    path: 'user-management',
    component: UserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    MatCardModule,
    AlertModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminComponent, UserComponent,
    DataManagementComponent,
    ApiManagementComponent
]
})
export class AdminModule { }
