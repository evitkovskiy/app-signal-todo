import { Component, EnvironmentInjector, inject } from '@angular/core';
import { TodoStore } from '@core/store';

@Component({
  selector: 'todos-search',
  templateUrl: './todos-search.html',
  styleUrl: './todos-search.scss',
})
export class TodosSearch {
  private readonly env = inject(EnvironmentInjector);
  public readonly store = TodoStore(this.env);
}
