import { ChangeDetectorRef, Injectable } from '@angular/core';
import { CategoryEntity, CreateCategoryDto } from '@esc/product/models';
import { CategoriesService } from '../infrastructure/categories.service';

@Injectable({ providedIn: 'root' })
export class ListCategoriesFacade {
  constructor(private categoriesService: CategoriesService) {}

  categories$ = this.categoriesService.categories$;

  createdCategory$ = this.categoriesService.createdCategory$;

  updatedCategory$ = this.categoriesService.updatedCategory$;

  categoryById$ = this.categoriesService.categoryById$;

  createCategory(category: CreateCategoryDto) {
    this.categoriesService.createCategory(category);
  }

  getCategoryById(id: string): void {
    this.categoriesService.getCategoryById(id);
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
  }
  updateCategory(id: string, category: CategoryEntity) {
    this.categoriesService.updateCategory(id, category);
  }
}
