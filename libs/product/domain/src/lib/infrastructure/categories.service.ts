import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryEntity } from '@esc/product/models';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  allCategories$ = this.http.get<CategoryEntity[]>(
    `${environment.baseUrlApi}/categories`
  );
}
