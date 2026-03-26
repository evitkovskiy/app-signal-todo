import { createFeature } from '@ngrx/store';
import { todosReducer } from './todos.reducer';

export const todosFeature = createFeature({
  name: 'todos',
  reducer: todosReducer,
});
