import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ListCategoriesFacade, ProductsService } from '@esc/product/domain';
import { take, tap } from 'rxjs';

@Component({
  selector: 'esc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private listCategoriesFacade: ListCategoriesFacade,
    private productsService: ProductsService
  ) {}

  categoriesOnHomePageCount = 6;

  categories$ = this.listCategoriesFacade.categories$.pipe(
    take(this.categoriesOnHomePageCount)
  );

  featuredProducts$ = this.productsService.featuredProducts$;
}
