import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesBannerComponent } from './categories-banner.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [CategoriesBannerComponent],
  imports: [CommonModule, NzIconModule],
  exports: [CategoriesBannerComponent],
})
export class CategoriesBannerModule {}
