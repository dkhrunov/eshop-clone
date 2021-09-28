import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopProductsFacade } from '@esc/product/domain';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CategoryEntity } from '@esc/product/models';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  pluck,
  shareReplay,
} from 'rxjs';

@Component({
  selector: 'product-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopProductsComponent {
  constructor(
    private shopProductsFacade: ShopProductsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selectedCategoriesFromUrl$ = this.route.queryParams.pipe(
    pluck('categories'),
    map((categories) => {
      if (categories) {
        const categoriesList = categories.split(',');
        return new Set<string>(categoriesList);
      }
      return new Set<string>();
    })
  );

  private selectedCategoriesSetSubject = new BehaviorSubject<Set<string>>(
    new Set()
  );
  selectedCategoriesSet$ = merge(
    this.selectedCategoriesSetSubject.asObservable(),
    this.selectedCategoriesFromUrl$
  ).pipe(shareReplay());

  products$ = this.shopProductsFacade.products$.pipe(shareReplay());

  categories$ = this.shopProductsFacade.categories$;

  filteredProducts$ = combineLatest([
    this.products$,
    this.selectedCategoriesSet$,
  ]).pipe(
    map(([products, categories]) => {
      return categories.size
        ? products.filter((product) => {
            const category = product.category as unknown as CategoryEntity;

            return categories.has(category.name);
          })
        : products;
    })
  );

  productsFound$ = this.filteredProducts$.pipe(
    map((products) => products.length)
  );

  toggleCategory(categories: string[]): void {
    this.changeUrlCategories(categories);
  }

  private changeUrlCategories(categories: string[]): void {
    categories.length
      ? this.router.navigate(['products'], {
          queryParams: { categories: categories.join(',') },
        })
      : this.router.navigate(['products']);
  }
}
