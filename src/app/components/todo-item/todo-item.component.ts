import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Interfaces/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo:Todo
  @Output() editDone_c = new EventEmitter()
  @Output() doubleClickedItem = new EventEmitter()
  // @Output() blurredItem = new EventEmitter()
  // @Output() enteredItem = new EventEmitter()
  @Output() cancelledItem = new EventEmitter()
  @Output() deletedItem = new EventEmitter()


  constructor() { }

  ngOnInit() {
  }

  editDone(todo:Todo):void{
    this.editDone_c.emit(todo)
  }

  editTodo(todo:Todo):void{
    this.doubleClickedItem.emit(todo)
  }

  cancelTodo(todo:Todo):void{
    this.cancelledItem.emit(todo)
  }

  deleteTodo(id:number):void{
    this.deletedItem.emit(id)
  }

}
