import { Injectable } from '@angular/core';
import { Todo } from '../Interfaces/todo';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError } from 'rxjs'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoTitle: string = ''
  idForTodo: number = 4
  beforeEditCashe: string = ''
  filter: string = 'all'
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.getTodos();
  }

  getTodos(): void {
    this.http.get(API_URL + '/todos')
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.todos = response
      })
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Something went wrong!')
  }

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return
    }

    this.http.post(API_URL + '/todos/', {
      title: this.todoTitle,
      completed: false
    })
      .subscribe((response: any) => {
        this.todos.push({
          id: response.id,
          title: this.todoTitle,
          completed: false,
          editing: false
        })
        this.todoTitle = ''
      })

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

    this.http.patch(API_URL + '/todos/' + todo.id, {
      title: todo.title,
      completed: todo.completed
    }).subscribe((response: any) => { })

    todo.editing = false
  }

  cancelTodo(todo: Todo): void {
    todo.title = this.beforeEditCashe
    todo.editing = false
  }

  deleteTodo(id: number): void {
    this.http.delete(API_URL + '/todos/' + id)
      .subscribe((respons: any) => {
        this.todos = this.todos.filter(todo => todo.id !== id)
      })
  }

  remainingTodos(): number {
    return this.todos.filter(x => !x.completed).length
  }

  atLeastOneCompleted(): boolean {
    return this.todos.filter(x => x.completed).length > 0
  }

  clearCompletedItems(): void {
    this.todos = this.todos.filter(x => !x.completed)
  }

  checkAllTodos(): void {
    const checkedTodo = (<HTMLInputElement>event.target).checked;

    for (let todo of this.todos) {

      todo.completed = !todo.completed
    }
    this.todos.forEach(todo => todo.completed = checkedTodo)

  }

  filterTodos(): Todo[] {
    if (this.filter === "all") {
      return this.todos
    } else if (this.filter === "active") {
      return this.todos.filter(x => !x.completed)
    } else if (this.filter === "completed") {
      return this.todos.filter(x => x.completed)
    }
    return this.todos
  }
}
