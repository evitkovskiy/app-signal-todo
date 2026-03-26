import { createActionGroup, props } from '@ngrx/store';
import { ITodo } from '@core/models';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    'Load Todos': props<{ todos: ITodo[] }>(),

    'Set Search': props<{ search: string }>(),

    'Add Todo': props<{ title: string; description: string }>(),
    'Add Todo Success': props<{ todos: ITodo[] }>(),

    'Remove Todo': props<{ id: number }>(),
    'Remove Todo Success': props<{ todos: ITodo[] }>(),

    'Toggle Completed': props<{ id: number }>(),
    'Toggle Completed Success': props<{ todos: ITodo[] }>(),
  },
});
