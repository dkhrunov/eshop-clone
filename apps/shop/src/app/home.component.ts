import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ListCategoriesFacade, ProductsService } from '@esc/product/domain';
import { shareReplay, take } from 'rxjs';

@Component({
  selector: 'esc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private listCategoriesFacade: ListCategoriesFacade,
    private productsService: ProductsService,
    private router: Router
  ) {}

  categoriesOnHomePageCount = 6;

  categories$ = this.listCategoriesFacade.categories$.pipe(
    take(this.categoriesOnHomePageCount),
    shareReplay()
  );

  featuredProducts$ = this.productsService.featuredProducts$;

  addProductToCart(id: string): void {
    console.log(`add product to cart ${id}`);
  }

  showProductPage(id: string): void {
    this.router.navigate(['products', id]);
  }
}
