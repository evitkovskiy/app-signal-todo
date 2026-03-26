import { inject } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { TodoService } from '@core/services';
import { TodoState } from '../models';
import { ITodo } from '@core/models';

export const TodoSignalStore = signalStore(
  { providedIn: 'root' },

  withState<TodoState>({
    todos: [],
    search: '',
    newTitle: '',
    newDescription: '',
  }),

  withComputed((store) => ({
    filtered: () => {
      const q = store.search().trim().toLowerCase();
      if (!q) return store.todos();

      return store
        .todos()
        .filter(
          (t: ITodo) =>
            t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
        );
    },
  })),

  withMethods((store, todoService = inject(TodoService)) => ({
    loadInitial() {
      patchState(store, {
        todos: todoService.todos(),
      });
    },

    setSearch(value: string): void {
      patchState(store, {
        search: value,
      });
    },

    setNewTitle(value: string): void {
      patchState(store, {
        newTitle: value,
      });
    },

    setNewDescription(value: string): void {
      patchState(store, {
        newDescription: value,
      });
    },

    addTodo(title: string, description: string): void {
      if (!title.trim()) return;

      todoService.addTodo(title, description);

      patchState(store, {
        todos: todoService.todos(),
        newTitle: '',
        newDescription: '',
      });
    },

    removeTodo(id: number): void {
      todoService.removeTodo(id);

      patchState(store, {
        todos: todoService.todos(),
      });
    },

    toggleCompleted(id: number): void {
      todoService.toggleTodo(id);

      patchState(store, {
        todos: todoService.todos(),
      });
    },
  })),
);
