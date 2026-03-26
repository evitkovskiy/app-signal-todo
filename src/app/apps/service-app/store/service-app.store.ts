import { Injectable, computed, inject, signal } from '@angular/core';
import { TodoService } from '@core/services';
import { ITodo } from '@core/models';

@Injectable({ providedIn: 'root' })
export class TodoServiceStore {
  private readonly todoService = inject(TodoService);

  public readonly todo = this.todoService.todos;
  public readonly searchPrompt = signal('');
  public readonly newTodoTitle = signal('');
  public readonly newTodoDescription = signal('');

  public readonly filteredTodos = computed(() => {
    const q = this.searchPrompt().trim().toLowerCase();
    if (!q) return this.todo();

    return this.todo().filter(
      (t: ITodo) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
    );
  });

  public addTodo(title: string, description: string): void {
    if (!title.trim()) return;
    this.todoService.addTodo(title, description);
    this.newTodoTitle.set('');
    this.newTodoDescription.set('');
  }

  public removeTodo(id: number): void {
    this.todoService.removeTodo(id);
  }

  public toggleCompleted(id: number): void {
    this.todoService.toggleTodo(id);
  }
}
