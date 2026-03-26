import {
  computed,
  inject,
  Injector,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { TodoService } from '@core/services';
import { ITodo } from '@core/models';

export type FactoryTodoStore = ReturnType<typeof createFactoryTodoStore>;

export function createFactoryTodoStore(env: Injector) {
  return runInInjectionContext(env, () => {
    const todoService = inject(TodoService);

    const todo = todoService.todos;
    const searchPrompt = signal('');
    const newTodoTitle = signal('');
    const newTodoDescription = signal('');

    const filteredTodos = computed(() => {
      const q = searchPrompt().trim().toLowerCase();
      if (!q) return todo();

      return todo().filter(
        (t: ITodo) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q),
      );
    });

    function addTodo(title: string, description: string): void {
      if (!title.trim()) return;
      todoService.addTodo(title, description);
      newTodoTitle.set('');
      newTodoDescription.set('');
    }

    function removeTodo(id: number): void {
      todoService.removeTodo(id);
    }

    function toggleCompleted(id: number): void {
      todoService.toggleTodo(id);
    }

    return {
      todo,
      searchPrompt,
      filteredTodos,
      newTodoTitle,
      newTodoDescription,
      addTodo,
      removeTodo,
      toggleCompleted,
    };
  });
}
