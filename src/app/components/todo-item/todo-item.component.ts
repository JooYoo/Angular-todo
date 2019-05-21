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

  constructor() { }

  ngOnInit() {
  }

  editDone(todo:Todo):void{
    this.editDone_c.emit(todo)
  }

}
