import { Component } from '@angular/core';
import { APPROACH_META, TODO_STORAGE_KEY, TODOS_STORE } from '@shared/tokens';
import { ApproachLayout, TodosList } from '@shared/ui';
import { APP_SUBTITLE, APP_TITLE } from './constants';
import { ReactiveTodoStore } from './store';
import { TodoService } from '@core/services';

@Component({
  selector: 'reactive-app',
  imports: [ApproachLayout, TodosList],
  providers: [
    TodoService,
    ReactiveTodoStore,
    { provide: TODO_STORAGE_KEY, useValue: 'todos_reactive' },
    { provide: TODOS_STORE, useExisting: ReactiveTodoStore },
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
export class ReactiveApp {}
