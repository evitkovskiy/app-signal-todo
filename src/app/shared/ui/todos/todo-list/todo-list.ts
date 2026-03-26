import { Component, computed, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TodoItem, TodoSearch, TodoDialog } from '@shared/ui';
import { TODOS_STORE } from '@shared/tokens';

@Component({
  selector: 'todo-list',
  imports: [AsyncPipe, TodoItem, TodoSearch, TodoDialog],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss'],
})
export class TodosList {
  public readonly store = inject(TODOS_STORE);

  private readonly todosSignal =
    this.store.filteredTodos ??
    this.store.filtered ??
    this.store.todo ??
    null;

  public readonly todos = computed(() => {
    return this.todosSignal ? this.todosSignal() : null;
  });

  public readonly todos$ =
    this.store.filteredTodos$ ??
    this.store.todos$ ??
    null;

  public readonly setSearch = this.store.setSearch
    ? this.store.setSearch.bind(this.store)
    : this.store.searchPrompt
    ? this.store.searchPrompt.set.bind(this.store.searchPrompt)
    : (value: string) => {};
}
