import { Component, inject, input, Input } from '@angular/core';
import { Router } from '@angular/router';
import { APPROACH_META } from '@shared/tokens';

@Component({
  selector: 'approach-layout',
  templateUrl: './approach-layout.html',
  styleUrls: ['./approach-layout.scss'],
})
export class ApproachLayout {
  public readonly meta = inject(APPROACH_META);
  private readonly router = inject(Router);

  goBack() {
    this.router.navigate(['/']);
  }
}
