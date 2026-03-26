import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { ITodo } from '@core/models';
import { TodoService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class ReactiveTodoStore {
  private readonly todos$ = new BehaviorSubject<ITodo[]>([]);
  private readonly search$ = new BehaviorSubject<string>('');
  private readonly todoService = inject(TodoService);

  constructor() {
    this.todos$.next(this.todoService.todos());
  }

  public readonly filteredTodos$ = combineLatest([this.todos$, this.search$]).pipe(
    map(([todos, search]) => {
      const q = search.trim().toLowerCase();
      if (!q) return todos;

      return todos.filter(
        (t: ITodo) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
      );
    }),
  );

  public setSearch(value: string): void {
    this.search$.next(value);
  }

  public addTodo(title: string, description: string): void {
    if (!title.trim()) return;

    this.todoService.addTodo(title, description);
    this.todos$.next(this.todoService.todos());
  }

  public removeTodo(id: number): void {
    this.todoService.removeTodo(id);
    this.todos$.next(this.todoService.todos());
  }

  public toggleCompleted(id: number): void {
    this.todoService.toggleTodo(id);
    this.todos$.next(this.todoService.todos());
  }
}
