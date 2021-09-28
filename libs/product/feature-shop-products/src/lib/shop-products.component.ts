import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopProductsFacade } from '@esc/product/domain';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CategoryEntity } from '@esc/product/models';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
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

  private selectedCategorySubject = new BehaviorSubject<string[]>([]);
  selectedCategoriesAction$ = this.selectedCategorySubject.asObservable();

  selectedCategories$ = merge(
    this.selectedCategoriesAction$,
    this.route.queryParams.pipe(
      tap((params) => {
        const categories: string | undefined = params['categories'];

        console.log(categories);

        if (categories) {
          this.selectedCategorySubject.next(categories.split(','));
        }
      })
    )
  ).subscribe();

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
    this.selectedCategorySubject.next(categories);
    this.changeUrlCategories(categories);
  }

  private changeUrlCategories(categories: string[]): void {
    this.router.navigate(['products'], {
      queryParams: { categories: categories.join(',') },
    });
  }
}
