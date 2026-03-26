import { Component, inject } from '@angular/core';
import { TodoService } from '@core/services';
import { APPROACH_META, TODO_STORAGE_KEY, TODOS_STORE } from '@shared/tokens';
import { ApproachLayout, TodosList } from '@shared/ui';
import { APP_SUBTITLE, APP_TITLE } from './constants';
import { TodoSignalStore } from './store';

@Component({
  selector: 'signalstore-app',
  imports: [ApproachLayout, TodosList],
  providers: [
    TodoService,
    TodoSignalStore,
    { provide: TODOS_STORE, useExisting: TodoSignalStore },
    { provide: TODO_STORAGE_KEY, useValue: 'todos_signal' },
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
export class SignalStoreApp {
  private readonly store = inject(TodoSignalStore);

  constructor() {
    this.store.loadInitial();
  }
}
