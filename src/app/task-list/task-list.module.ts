import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'task-list',
    component: TaskListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatTableModule,

    RouterModule.forChild(routes)
  ],
  declarations: [TaskListComponent, CreateTaskComponent]
})
export class TaskListModule { }
