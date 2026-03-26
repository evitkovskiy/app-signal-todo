import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shell').then((m) => m.ArchitectureSelector),
  },

  {
    path: 'factory',
    loadComponent: () => import('./apps').then((m) => m.FactoryApp),
  },
  {
    path: 'service',
    loadComponent: () => import('./apps').then((m) => m.ServiceApp),
  },
  {
    path: 'signalstore',
    loadComponent: () => import('./apps').then((m) => m.SignalStoreApp),
  },
  {
    path: 'reactive',
    loadComponent: () => import('./apps').then((m) => m.ReactiveApp),
  },
  {
    path: 'ngrx',
    loadComponent: () => import('./apps').then((m) => m.NgRxApp),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
