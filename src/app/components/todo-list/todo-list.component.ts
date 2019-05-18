import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Interfaces/todo'

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: Todo[]
  todoTitle: string
  idForTodo: number
  beforeEditCashe: string

  constructor() { }

  ngOnInit() {
    this.beforeEditCashe = ''
    this.todoTitle = ''
    this.idForTodo = 4
    this.todos = [
      {
        'id': 1,
        'title': 'Finish Angular Screencast',
        'completed': false,
        'editing': false,
      },
      {
        'id': 2,
        'title': 'Take over world',
        'completed': false,
        'editing': false,
      },
      {
        'id': 3,
        'title': 'One more thing',
        'completed': false,
        'editing': false,
      },
    ];

  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return
    }

    this.todos.push({
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    })

    this.todoTitle = ''
    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCashe = todo.title
    todo.editing = true
  }

  editDone(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCashe
    }
    todo.editing = false
  }

  cancelTodo(todo: Todo): void {
    todo.title = this.beforeEditCashe
    todo.editing = false
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  remainingTodos():number{
    return this.todos.filter(x=>!x.completed).length
  }

}