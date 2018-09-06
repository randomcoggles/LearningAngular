import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MatButtonModule, MatIconModule, MatInputModule, MatCheckboxModule, MatListModule } from '@angular/material';


const routes: Routes = [
  { path: 'todos', component: TodosComponent }
];


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    RouterModule.forChild(routes)
  ],
  exports: [TodosComponent, RouterModule],
  declarations: [TodosComponent, CreateTodoComponent, TodoListComponent]
})
export class TodosModule { }
