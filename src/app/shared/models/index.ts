import { Signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

import { ITodo } from '@core/models';

export interface ApproachMeta {
  title: string;
  subtitle: string;
}

export interface TodosStore {
  todo?: Signal<ITodo[]>;
  filteredTodos?: Signal<ITodo[]>;
  filtered?: Signal<ITodo[]>;

  todos$?: Observable<ITodo[]>;
  filteredTodos$?: Observable<ITodo[]>;

  searchPrompt?: WritableSignal<string>;
  setSearch?(value: string): void;

  addTodo(title: string, description: string): void;
  removeTodo(id: number): void;
  toggleCompleted(id: number): void;
  loadInitial?(): void;
}
