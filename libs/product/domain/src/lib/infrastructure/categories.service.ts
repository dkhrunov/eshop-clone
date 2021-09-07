import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CategoryEntity,
  CreateCategoryDto,
  DeleteCategoryResponse,
} from '@esc/product/models';
import {
  concatMap,
  map,
  merge,
  Observable,
  pluck,
  scan,
  shareReplay,
  Subject,
} from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  private categoriesUrl = `${environment.baseUrlApi}/categories`;

  private createCategorySubject = new Subject<CreateCategoryDto>();
  createCategoryAction$ = this.createCategorySubject.asObservable();

  private deleteCategorySubject = new Subject<string>();
  deleteCategoryAction$ = this.deleteCategorySubject.asObservable();

  allCategories$ = this.http.get<CategoryEntity[]>(this.categoriesUrl);

  createdCategory$ = this.createCategoryAction$.pipe(
    concatMap((category) => {
      return this.createCategoryOnServer(category);
    })
  );

  deletedCategory$ = this.deleteCategoryAction$.pipe(
    concatMap((id) => this.deleteCategoryOnServer(id))
  );

  categories$ = merge(
    this.allCategories$,
    this.createdCategory$,
    this.deletedCategory$
  ).pipe(
    scan((categories, category) => {
      if (Array.isArray(category)) {
        return [...categories, ...category];
      } else if (typeof category === 'string') {
        return categories.filter((c) => c.id !== category);
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

  deleteCategory(id: string): void {
    this.deleteCategorySubject.next(id);
  }

  private createCategoryOnServer(
    category: CreateCategoryDto
  ): Observable<CategoryEntity> {
    return this.http.post<CategoryEntity>(this.categoriesUrl, category);
  }

  private deleteCategoryOnServer(id: string): Observable<string> {
    return this.http
      .delete<DeleteCategoryResponse>(`${this.categoriesUrl}/${id}`)
      .pipe(pluck('categoryDeleted'));
  }
}
