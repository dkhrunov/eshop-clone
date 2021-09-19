import { Injectable } from '@angular/core';
import { CategoryEntity, CreateCategoryDto } from '@esc/product/models';
import { CategoriesService } from '../infrastructure/categories.service';
import { ImageService } from '../infrastructure/image.service';

@Injectable({ providedIn: 'root' })
export class ListCategoriesFacade {
  constructor(
    private categoriesService: CategoriesService,
    private imageService: ImageService
  ) {}

  categories$ = this.categoriesService.resources$;

  createdCategory$ = this.categoriesService.created$;

  updatedCategory$ = this.categoriesService.updated$;

  categoryById$ = this.categoriesService.getById$;

  uploadedImageUrl$ = this.imageService.uploadedImageUrl$;

  uploadImage(image: FormData): void {
    this.imageService.uploadImage(image);
  }

  createCategory(category: CreateCategoryDto): void {
    this.categoriesService.create(category);
  }

  getCategoryById(id: string): void {
    this.categoriesService.getById(id);
  }

  deleteCategory(id: string): void {
    this.categoriesService.delete(id);
  }
  updateCategory(id: string, category: CategoryEntity): void {
    this.categoriesService.update(id, category);
  }
}
