import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractCategoryNamePipe } from './extract-category.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ExtractCategoryNamePipe],
  exports: [ExtractCategoryNamePipe],
})
export class ProductUiPipesModule {}
