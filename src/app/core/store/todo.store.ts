import {
  computed,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { ITodo, ITodoStore } from '@core/models';
import { TodoService } from '@core/services';

export function TodoStore(env: EnvironmentInjector): ITodoStore {
  return runInInjectionContext(env, () => {
    const todoService = inject(TodoService);

    const todo = todoService.todos;

    const loading = signal(false);

    const searchPrompt = signal('');

    const newTodoTitle = signal('');

    const newTodoDescription = signal('');

    const filteredTodos = computed(() => {
      const value = searchPrompt().trim().toLowerCase();
      if (!value) return todo();

      return todo().filter(
        (t: ITodo) =>
          t.title.toLowerCase().includes(value) || t.description.toLowerCase().includes(value),
      );
    });

    function addTodo(title: string, description: string) {
      todoService.addTodo(title, description);
      newTodoTitle.set('');
      newTodoDescription.set('');
    }

    function removeTodo(id: number): void {
      todoService.removeTodo(id);
    }

    return {
      todo,
      loading,
      searchPrompt,
      filteredTodos,
      newTodoTitle,
      newTodoDescription,
      addTodo,
      removeTodo,
    };
  });
}
