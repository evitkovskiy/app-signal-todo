import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/todos/todos-list/todos-list').then((m) => m.TodosList),
  },
];
