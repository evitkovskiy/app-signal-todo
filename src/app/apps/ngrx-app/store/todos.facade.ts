import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITodo } from '@core/models';
import { TodosActions } from './todos.actions';
import { filteredTodos$, selectSearch } from './todos.selectors';

@Injectable({ providedIn: 'root' })
export class TodosFacade {
  private readonly store = inject(Store);

  public readonly todos$ = this.store.select(filteredTodos$);

  public readonly search$ = this.store.select(selectSearch);

  public loadInitial(todos: ITodo[]): void {
    this.store.dispatch(TodosActions.loadTodos({ todos }));
  }

  public setSearch(search: string): void {
    this.store.dispatch(TodosActions.setSearch({ search }));
  }

  public addTodo(title: string, description: string): void {
    this.store.dispatch(TodosActions.addTodo({ title, description }));
  }

  public removeTodo(id: number): void {
    this.store.dispatch(TodosActions.removeTodo({ id }));
  }

  public toggleCompleted(id: number): void {
    this.store.dispatch(TodosActions.toggleCompleted({ id }));
  }
}
