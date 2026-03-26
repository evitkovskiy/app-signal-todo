import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="app">
      <router-outlet />
    </main>
  `,
  styleUrls: ['./app.scss'],
})
export class App {}
