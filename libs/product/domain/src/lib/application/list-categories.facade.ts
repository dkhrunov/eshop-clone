import { Injectable } from '@angular/core';
import { CategoryEntity, CreateCategoryDto } from '@esc/product/models';
import { CategoriesService } from '../infrastructure/categories.service';

@Injectable({ providedIn: 'root' })
export class ListCategoriesFacade {
  constructor(private categoriesService: CategoriesService) {}

  categories$ = this.categoriesService.resources$;

  createdCategory$ = this.categoriesService.created$;

  updatedCategory$ = this.categoriesService.updated$;

  categoryById$ = this.categoriesService.getById$;

  createCategory(category: CreateCategoryDto) {
    this.categoriesService.create(category);
  }

  getCategoryById(id: string): void {
    this.categoriesService.getById(id);
  }

  deleteCategory(id: string) {
    this.categoriesService.delete(id);
  }
  updateCategory(id: string, category: CategoryEntity) {
    this.categoriesService.update(id, category);
  }
}
