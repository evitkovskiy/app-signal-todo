import { Component } from '@angular/core';
import { ApproachLayout, TodosList } from '@shared/ui';
import { APPROACH_META, TODO_STORAGE_KEY, TODOS_STORE } from '@shared/tokens';
import { APP_SUBTITLE, APP_TITLE } from './constants';
import { TodoServiceStore } from './store';
import { TodoService } from '@core/services';

@Component({
  selector: 'service-app',
  imports: [ApproachLayout, TodosList],
  providers: [
    TodoService,
    TodoServiceStore,
    { provide: TODO_STORAGE_KEY, useValue: 'todos_service' },
    { provide: TODOS_STORE, useExisting: TodoServiceStore },
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
export class ServiceApp {}
