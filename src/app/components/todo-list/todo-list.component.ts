import { Component, OnInit } from '@angular/core';
import { Todo } from '../../Interfaces/todo'
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  animations:[
  trigger('fade',[
      
      transition(':enter',[
        style({opacity: 0, transform: 'translateY(30px)'}),
        animate(200,style({opacity:1, transform: 'translateY(0px)'}))
      ]),

      transition(':leave',[
       animate(200,style({opacity:0, transform:'translateY(30px)'}))
      ])

    ])
  ]
})
export class TodoListComponent implements OnInit {

  todos: Todo[]
  todoTitle: string
  idForTodo: number
  beforeEditCashe: string
  filter:string

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

  atLeastOneCompleted():boolean{
    return this.todos.filter(x=>x.completed).length >0
  }

  clearCompletedItems():void{
    this.todos = this.todos.filter(x=>!x.completed)
  }

  checkAllTodos():void{
    for(let todo of this.todos){
      todo.completed = !todo.completed
    }
   this.todos.forEach(x=>x.completed =(<HTMLInputElement>event.target).checked)
  }

  filterTodos():Todo[]{
    if(this.filter === "all"){
      return this.todos
    }else if(this.filter === "active"){
      return this.todos.filter(x=>!x.completed)
    }else if(this.filter === "completed"){
      return this.todos.filter(x=>x.completed)
    }
    return this.todos
  }
  

}