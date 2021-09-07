import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryEntity, CreateCategoryDto } from '@esc/product/models';
import { concatMap, merge, Observable, scan, shareReplay, Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  private categoriesUrl = `${environment.baseUrlApi}/categories`;

  private createCategorySubject = new Subject<CreateCategoryDto>();
  createCategoryAction$ = this.createCategorySubject.asObservable();

  allCategories$ = this.http.get<CategoryEntity[]>(this.categoriesUrl);

  createdCategory$ = this.createCategoryAction$.pipe(
    concatMap((category) => {
      return this.createCategoryOnServer(category);
    })
  );

  categories$ = merge(this.allCategories$, this.createdCategory$).pipe(
    scan((categories, category) => {
      if (Array.isArray(category)) {
        return [...categories, ...category];
      } else {
        const isCategoryExist = categories.find(
          (item) => item.id === category.id
        );

        return isCategoryExist ? [...categories] : [...categories, category];
      }
    }, [] as CategoryEntity[]),
    shareReplay()
  );

  createCategory(category: CreateCategoryDto): void {
    this.createCategorySubject.next(category);
  }

  private createCategoryOnServer(
    category: CreateCategoryDto
  ): Observable<CategoryEntity> {
    return this.http.post<CategoryEntity>(this.categoriesUrl, category);
  }
}
