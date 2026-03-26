import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from '@core/services';
import { ApproachLayout, TodosList } from '@shared/ui';
import { APPROACH_META, TODO_STORAGE_KEY, TODOS_STORE } from '@shared/tokens';
import { APP_TITLE, APP_SUBTITLE } from './constants';
import { TodosFacade } from './store';

@Component({
  selector: 'ngrx-app',
  imports: [ApproachLayout, TodosList],
  providers: [
    { provide: TODO_STORAGE_KEY, useValue: 'todos_ngrx' },
    TodoService,
    TodosFacade,
    { provide: TODOS_STORE, useExisting: TodosFacade },
    {
      provide: APPROACH_META,
      useValue: {
        title: APP_TITLE,
        subtitle: APP_SUBTITLE,
      },
    },
  ],
  template: ` <approach-layout>
    <todo-list />
  </approach-layout>`,
})
export class NgRxApp implements OnInit {
  private readonly facade = inject(TodosFacade);
  private readonly todoService = inject(TodoService);

  ngOnInit(): void {
    this.facade.loadInitial(this.todoService.todos());
  }
}
