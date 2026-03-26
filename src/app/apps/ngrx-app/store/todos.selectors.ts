import { createSelector } from '@ngrx/store';
import { ITodo } from '@core/models';
import { todosFeature } from './todos.features';

export const {
  selectTodos,
  selectSearch,
} = todosFeature;

export const filteredTodos$ = createSelector(
  selectTodos,
  selectSearch,
  (todos, search) => {
    const q = search.trim().toLowerCase();
    if (!q) return todos;

    return todos.filter(
      (t: ITodo) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q),
    );
  },
);
