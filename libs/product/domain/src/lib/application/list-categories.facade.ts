import { Injectable } from '@angular/core';
import { CategoriesService } from '../infrastructure/categories.service';

@Injectable({ providedIn: 'root' })
export class ListCategoriesFacade {
  allCategories$ = this.categoriesService.allCategories$;

  constructor(private categoriesService: CategoriesService) {}
}
