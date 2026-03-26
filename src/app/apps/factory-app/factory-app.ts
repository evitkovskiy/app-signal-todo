import { Component, Injector } from '@angular/core';
import { ApproachLayout, TodosList } from '@shared/ui';
import { APPROACH_META, TODO_STORAGE_KEY, TODOS_STORE } from '@shared/tokens';
import { APP_SUBTITLE, APP_TITLE } from './constants';
import { createFactoryTodoStore } from './store';
import { TodoService } from '@core/services';

@Component({
  selector: 'factory-app',
  imports: [ApproachLayout, TodosList],
  providers: [
    TodoService,
    { provide: TODO_STORAGE_KEY, useValue: 'todos_factory' },
    {
      provide: TODOS_STORE,
      useFactory: (env: Injector) => createFactoryTodoStore(env),
      deps: [Injector],
    },
    {
      provide: APPROACH_META,
      useValue: {
        title: APP_TITLE,
        subtitle: APP_SUBTITLE,
      },
    },
  ],
  template: `
    <approach-layout>
      <todo-list />
    </approach-layout>
  `,
})
export class FactoryApp {}
