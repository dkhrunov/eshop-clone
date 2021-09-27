import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [FeaturedProductsComponent],
  imports: [CommonModule, NzButtonModule, NzIconModule],
  exports: [FeaturedProductsComponent],
})
export class FeaturedProductsModule {}
