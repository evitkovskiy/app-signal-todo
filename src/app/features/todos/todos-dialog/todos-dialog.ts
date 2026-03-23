import {
  Component,
  ElementRef,
  EnvironmentInjector,
  inject,
  viewChild,
  afterNextRender,
} from '@angular/core';
import { TodoStore } from '@core/store';

@Component({
  selector: 'todos-dialog',
  templateUrl: './todos-dialog.html',
  styleUrl: './todos-dialog.scss',
})
export class TodosDialog {
  private readonly env = inject(EnvironmentInjector);
  public readonly store = TodoStore(this.env);

  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  private readonly titleInput = viewChild<ElementRef<HTMLInputElement>>('titleInput');

  constructor() {
    afterNextRender(() => {
      this.titleInput()?.nativeElement.focus();
    });
  }

  public open(): void {
    this.dialog()?.nativeElement.showModal();
  }

  public createTodo(title: string, description: string): void {
    if (!title.trim()) return;
    this.store.addTodo(title, description);

    this.store.newTodoTitle.set('');
    this.store.newTodoDescription.set('');
  }
}
