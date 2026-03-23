import { Injectable, signal } from '@angular/core';
import { ITodo } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly _todos = signal<ITodo[]>([
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
    {
      id: 3,
      title: 'Отправить отчет',
      description: 'Подготовить квартальный отчет для руководства',
      complete: false,
    },
    {
      id: 4,
      title: 'Полить цветы',
      description: 'Не забыть про кактусы на подоконнике',
      complete: true,
    },
    {
      id: 5,
      title: 'Прочитать книгу',
      description: 'Закончить главу про архитектуру микросервисов',
      complete: false,
    }
  ]);

  public readonly todos = this._todos.asReadonly();

  public addTodo(title: string, description: string): void {
    const newTodo: ITodo = {
      id: new Date().getTime(),
      title,
      description,
      complete: false
    };

    this._todos.update((todos: ITodo[]) => [...todos, newTodo]);
  }

  public removeTodo(id: number): void {
    this._todos.update((todos: ITodo[]) => todos.filter((todo: ITodo) => todo.id !== id))
  }
}
