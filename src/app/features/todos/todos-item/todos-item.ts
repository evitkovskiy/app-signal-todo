import { Component, Input, EnvironmentInjector, inject, input } from '@angular/core';
import { ITodo } from '@core/models';
import { TodoStore } from '@core/store';

@Component({
  selector: 'todos-item',
  templateUrl: './todos-item.html',
  styleUrl: './todos-item.scss',
})
export class TodosItem {
  private readonly env = inject(EnvironmentInjector);

  public readonly todo = input.required<ITodo>();
  public readonly store = TodoStore(this.env);

  public removeTodo(): void {
    this.store.removeTodo(this.todo().id);
  }
}
