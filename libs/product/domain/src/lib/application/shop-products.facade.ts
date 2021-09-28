import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ProductsService } from '../..';
import { CategoriesService } from '../infrastructure/categories.service';

@Injectable({ providedIn: 'root' })
export class ShopProductsFacade {
  constructor(
    private productsService: ProductsService,
    private categoryService: CategoriesService
  ) {}

  products$ = this.productsService.resources$.pipe(
    map((products) => products.filter((product) => product.category))
  );

  categories$ = this.categoryService.resources$;

  productWithCategories$ = this.productsService.productsWithCategories$;

  getProductsWithCategories(categories: string[]): void {
    this.productsService.getProductWithCategories(categories);
  }
}
