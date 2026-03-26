import { Injectable, inject, signal, effect } from '@angular/core';
import { ITodo } from '@core/models';
import { TODO_STORAGE_KEY } from '@shared/tokens';
import { loadFromStorage, saveToStorage } from '@core/utils/local-storage';

@Injectable()
export class TodoService {
  private readonly storageKey = inject(TODO_STORAGE_KEY);

  private readonly _todos = signal<ITodo[]>(
    loadFromStorage(this.storageKey, [
      {
        id: 1,
        title: 'Купить продукты',
        description: 'Молоко, хлеб, яйца и фрукты',
        complete: false,
      },
      {
        id: 2,
        title: 'Записаться в зал',
        description: 'Найти ближайший фитнес-центр с бассейном',
        complete: true,
      },
    ])
  );

  public readonly todos = this._todos.asReadonly();

  constructor() {
    effect(() => {
      saveToStorage(this.storageKey, this._todos());
    });
  }

  public addTodo(title: string, description: string): void {
    const newTodo: ITodo = {
      id: Date.now(),
      title,
      description,
      complete: false,
    };

    this._todos.update(todos => [...todos, newTodo]);
  }

  public removeTodo(id: number): void {
    this._todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  public toggleTodo(id: number): void {
    this._todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  }
}
