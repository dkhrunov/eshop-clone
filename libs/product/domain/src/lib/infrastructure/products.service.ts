import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreateProductDto, ProductEntity } from '@esc/product/models';
import { AbstractRestService, CountResponse } from '@esc/shared/util-models';
import { pluck } from 'rxjs';
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

  productCount$ = this.http
    .get<CountResponse>(`${this.resourceUrl}/count`)
    .pipe(pluck('product_count'));
}
