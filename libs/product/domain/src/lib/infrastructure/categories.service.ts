import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CategoryEntity, CreateCategoryDto } from '@esc/product/models';

import { AbstractRestService } from '@esc/shared/util-models';
import { CATEGORIES_URL } from './categoriesUrl.token';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends AbstractRestService<
  CategoryEntity,
  CreateCategoryDto
> {
  constructor(http: HttpClient, @Inject(CATEGORIES_URL) url: string) {
    super(http, url);
  }
}
