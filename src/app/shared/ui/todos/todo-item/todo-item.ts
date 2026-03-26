import { Component, input, inject } from '@angular/core';
import { ITodo } from '@core/models';
import { TODOS_STORE } from '../../../tokens';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.html',
  styleUrls: ['./todo-item.scss'],
})
export class TodoItem {
  readonly todo = input.required<ITodo>();
  readonly store = inject(TODOS_STORE);

  remove() {
    this.store.removeTodo(this.todo().id);
  }

  toggleCompleted() {
    this.store.toggleCompleted(this.todo().id);
  }
}
