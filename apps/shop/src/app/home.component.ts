import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ListCategoriesFacade } from '@esc/product/domain';
import { take, tap } from 'rxjs';

@Component({
  selector: 'esc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private listCategoriesFacade: ListCategoriesFacade) {}

  categories$ = this.listCategoriesFacade.categories$.pipe(take(6));
}
