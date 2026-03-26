import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todosFeature } from './apps/ngrx-app/store/todos.features';
import { TodosEffects } from './apps/ngrx-app/store/todos.effects';

import { routes } from './app.routes';
import { TODO_STORAGE_KEY } from '@shared/tokens';
import { TodoService } from '@core/services';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: TODO_STORAGE_KEY,
      useValue: 'todos_ngrx',
    },
    TodoService,
    provideStore({
      [todosFeature.name]: todosFeature.reducer,
    }),

    provideEffects(TodosEffects),

    provideStoreDevtools(),

    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
  ],
};
