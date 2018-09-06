import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-management/',
    component: UserComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)

  ],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserModule { }
