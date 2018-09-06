import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todos.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  todoForm: FormGroup;
  addSubsccription;
  @Output() addTodo = new EventEmitter();
  title: string;
  description: string;
  todo: Todo = {title: '', description: '', done: false};

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      done: [false]
    });

    this.addSubsccription = this.addTodo.subscribe(() => {
      this.todoForm.reset();
    });
  }

  onAddTodo() {
    console.log('Adding a todo...');
    this.addTodo.emit(this.todoForm.value);
  }

}
