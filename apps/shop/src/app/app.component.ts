import { Component } from '@angular/core';
import { generateCard } from '@esc/shared/util-helpers';

@Component({
  selector: 'esc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [{ provide: Window, useValue: window }],
})
export class AppComponent {
  constructor(private window: Window) {}

  cardsInWidth = Math.floor(this.window.innerWidth / 290);

  cards = Array.from({ length: this.cardsInWidth * 3 }).map(() =>
    generateCard()
  );
}
