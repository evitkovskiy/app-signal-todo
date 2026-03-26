import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs';
import { TodoService } from '@core/services';
import { TodosActions } from './todos.actions';


@Injectable()
export class TodosEffects {
  private readonly actions$ = inject(Actions);
  private readonly todoService = inject(TodoService);

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.addTodo),
      tap(({ title, description }) => {
        this.todoService.addTodo(title, description);
      }),
      map(() =>
        TodosActions.addTodoSuccess({
          todos: this.todoService.todos(),
        }),
      ),
    ),
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.removeTodo),
      tap(({ id }) => {
        this.todoService.removeTodo(id);
      }),
      map(() =>
        TodosActions.removeTodoSuccess({
          todos: this.todoService.todos(),
        }),
      ),
    ),
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodosActions.toggleCompleted),
      tap(({ id }) => {
        this.todoService.toggleTodo(id);
      }),
      map(() =>
        TodosActions.toggleCompletedSuccess({
          todos: this.todoService.todos(),
        }),
      ),
    ),
  );
}
