import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CreateProductDto, ProductEntity } from '@esc/product/models';
import { AbstractRestService, CountResponse } from '@esc/shared/util-models';
import { Observable, pluck, shareReplay, Subject, switchMap } from 'rxjs';
import { PRODUCTS_URL } from './productsUrl.token';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends AbstractRestService<
  ProductEntity,
  CreateProductDto
> {
  constructor(http: HttpClient, @Inject(PRODUCTS_URL) url: string) {
    super(http, url);
  }

  featuredProductCount = 4;

  productCount$ = this.http
    .get<CountResponse>(`${this.resourceUrl}/count`)
    .pipe(pluck('product_count'));

  featuredProducts$ = this.http
    .get<ProductEntity[]>(
      `${this.resourceUrl}/featured?limit=${this.featuredProductCount}`
    )
    .pipe(shareReplay());

  private productWithCategoriesSubject = new Subject<string[]>();
  productWithCategoriesAction$ =
    this.productWithCategoriesSubject.asObservable();

  productsWithCategories$ = this.productWithCategoriesAction$.pipe(
    switchMap((categories) =>
      this.getProductWithCategoriesFromServer(categories)
    )
  );

  getProductWithCategories(categories: string[]): void {
    this.productWithCategoriesSubject.next(categories);
  }

  private getProductWithCategoriesFromServer(
    categories: string[]
  ): Observable<ProductEntity[]> {
    return this.http.get<ProductEntity[]>(
      `${this.resourceUrl}?categories=${categories}`
    );
  }
}
