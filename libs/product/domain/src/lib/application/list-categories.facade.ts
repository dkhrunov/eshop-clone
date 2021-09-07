import { ChangeDetectorRef, Injectable } from '@angular/core';
import { CreateCategoryDto } from '@esc/product/models';
import { CategoriesService } from '../infrastructure/categories.service';

@Injectable({ providedIn: 'root' })
export class ListCategoriesFacade {
  constructor(private categoriesService: CategoriesService) {}

  categories$ = this.categoriesService.categories$;

  createdCategory$ = this.categoriesService.createdCategory$;

  createCategory(category: CreateCategoryDto) {
    this.categoriesService.createCategory(category);
  }
}
