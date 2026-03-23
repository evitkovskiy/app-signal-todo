import { Component, EnvironmentInjector, inject, viewChild } from '@angular/core';
import { TodoStore } from '@core/store';

import { TodosSearch } from '../todos-search/todos-search';
import { TodosDialog } from '../todos-dialog/todos-dialog';
import { TodosItem } from '../todos-item/todos-item';

@Component({
  selector: 'todo-todos-list',
  imports: [TodosSearch, TodosDialog, TodosItem],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList {
  private readonly env = inject(EnvironmentInjector);

  public readonly store = TodoStore(this.env);
  public readonly dialog = viewChild(TodosDialog);
}
