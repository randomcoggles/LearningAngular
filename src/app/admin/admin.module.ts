import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { UserModule } from './user/user.module';
import { UserComponent } from '../core/user/user.component';

const routes: Routes  = [
  {
    path: 'admin',
    component: AdminComponent
  }, {
    path: 'user-management',
    component: UserComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminComponent, UserComponent]
})
export class AdminModule { }
