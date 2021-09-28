import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopProductsFacade } from '@esc/product/domain';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CategoryEntity } from '@esc/product/models';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  merge,
  pluck,
  shareReplay,
  tap,
} from 'rxjs';

@Component({
  selector: 'product-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.less'],
})
export class ShopProductsComponent {
  constructor(
    private shopProductsFacade: ShopProductsFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  selectedCategoryFromUrl$ = this.route.queryParams.pipe(
    tap((params) => {
      const categories: string | undefined = params['categories'];

      if (categories) {
        const categoriesList = categories.split(',');
        this.selectedCategorySubject.next(categoriesList);
      }
    }),
    pluck('categories'),
    filter(Boolean),
    map((categories) => {
      const categoriesList = categories.split(',');

      if (categoriesList.length === 1) {
        return categoriesList.join();
      }
    })
  );

  private selectedCategorySubject = new BehaviorSubject<string[]>([]);
  selectedCategoriesAction$ = this.selectedCategorySubject.asObservable();

  products$ = this.shopProductsFacade.products$.pipe(shareReplay());

  categories$ = this.shopProductsFacade.categories$;

  filteredProducts$ = combineLatest([
    this.products$,
    this.selectedCategoriesAction$,
  ]).pipe(
    map(([products, categories]) => {
      return categories.length
        ? products.filter((product) => {
            const category = product.category as unknown as CategoryEntity;

            return categories.includes(category.name);
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
    this.router.navigate(['products'], {
      queryParams: { categories: categories.join(',') },
    });
  }
}
