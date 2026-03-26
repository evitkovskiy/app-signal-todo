import { InjectionToken } from '@angular/core';
import { ApproachMeta, TodosStore } from '@shared/models';

export const APPROACH_META = new InjectionToken<ApproachMeta>('APPROACH_META');

export const TODOS_STORE = new InjectionToken<TodosStore>('TODOS_STORE');

export const TODO_STORAGE_KEY = new InjectionToken<string>('TODO_STORAGE_KEY');
