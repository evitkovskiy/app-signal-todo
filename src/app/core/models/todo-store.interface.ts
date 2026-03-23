import { Signal, WritableSignal } from '@angular/core';
import { ITodo } from './todo.interface';

export interface ITodoStore {
  todo: Signal<ITodo[]>;
  loading: WritableSignal<boolean>;
  searchPrompt: WritableSignal<string>;
  newTodoTitle: WritableSignal<string>;
  newTodoDescription: WritableSignal<string>;
  filteredTodos: Signal<ITodo[]>;

  addTodo(title: string, description: string): void;
  removeTodo(id: number): void;
}
