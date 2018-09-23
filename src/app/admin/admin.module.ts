import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { UserComponent } from '../core/user/user.component';
import { MatCardModule, MatProgressBarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { DataManagementComponent } from './data-management/data-management.component';
import { AlertModule } from '../shared/alert/alert.module';
import { ApiManagementComponent } from './api-management/api-management.component';
import { AuthManagementComponent } from './auth-management/auth-management.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'user-management',
    component: UserComponent
  },
  {
    path: 'admin/data-management',
    component: DataManagementComponent
  },
  {
    path: 'admin/api-management',
    component: ApiManagementComponent
  },
  {
    path: 'admin/auth-management',
    component: AuthManagementComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    MatCardModule,
    MatButtonModule,
    AlertModule,
    MatIconModule,
    MatProgressBarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminComponent,
    UserComponent,
    DataManagementComponent,
    ApiManagementComponent
,
    AuthManagementComponent
]
})
export class AdminModule {}
