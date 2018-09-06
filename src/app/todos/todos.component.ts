import { Component, OnInit } from '@angular/core';
import { TodoWithID, Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todosList: Array<TodoWithID> = [];
  activeComponent = 'todos-list';
  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todosService.getAll().then((todos: Array<TodoWithID>) => {
      this.todosList = todos;
    });
  }

  onAddTodo(todo: Todo) {
    this.todosService
      .add(todo)
      .then((id) => {
        this.todosList = [...this.todosList, Object.assign({}, todo, { id })];
      });
  }

  onToggleTodo({ id, done }: { id: number, done: boolean }) {
    this.todosService
      .update(id, { done })
      .then(() => {
        const todoToUpdate = this.todosList.find((todo) => todo.id === id);
        this.todosList = [...this.todosList.filter((todo) => todo.id !== id), Object.assign({}, todoToUpdate, { done })];
      });
  }

  onDeleteTodo(id: number) {
    this.todosService
      .remove(id)
      .then(() => {
        this.todosList = this.todosList.filter((todo) => todo.id !== id);
      });
  }

}
