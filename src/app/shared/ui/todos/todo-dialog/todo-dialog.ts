import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TODOS_STORE } from '@shared/tokens';

@Component({
  selector: 'todo-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './todo-dialog.html',
  styleUrls: ['./todo-dialog.scss'],
})
export class TodoDialog {
  public readonly store = inject(TODOS_STORE);

  public readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');

  public readonly form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  public open(): void {
    this.dialog()?.nativeElement.showModal();
  }

  public createTodo(): void {
    const { title, description } = this.form.getRawValue();

    this.store.addTodo(title ?? '', description ?? '');
    this.form.reset();
  }
}
