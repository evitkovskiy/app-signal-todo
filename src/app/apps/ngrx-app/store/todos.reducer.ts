import { createReducer, on } from '@ngrx/store';
import { ITodo } from '@core/models';
import { TodosActions } from './todos.actions';

export interface TodosState {
  todos: ITodo[];
  search: string;
}

export const initialState: TodosState = {
  todos: [],
  search: '',
};

export const todosReducer = createReducer(
  initialState,

  on(TodosActions.loadTodos, (state, { todos }) => ({
    ...state,
    todos,
  })),

  on(TodosActions.setSearch, (state, { search }) => ({
    ...state,
    search,
  })),

  on(TodosActions.addTodoSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),

  on(TodosActions.removeTodoSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),

  on(TodosActions.toggleCompletedSuccess, (state, { todos }) => ({
    ...state,
    todos,
  })),
);
