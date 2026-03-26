import { afterNextRender, Component, input, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'todo-search',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-search.html',
  styleUrls: ['./todo-search.scss'],
})
export class TodoSearch {
  public readonly setSearch = input.required<(value: string) => void>();

  public readonly searchControl = new FormControl('');
  public readonly searchControlChanged = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap((value) => this.setSearch()(value ?? '')),
    ),
  );

  constructor() {
    afterNextRender(() => {
      this.searchControlChanged();
    });
  }
}
