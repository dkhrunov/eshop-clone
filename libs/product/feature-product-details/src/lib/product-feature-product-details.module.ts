import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    RouterModule.forChild([{ path: '', component: ProductDetailsComponent }]),
  ],
  declarations: [ProductDetailsComponent],
  exports: [ProductDetailsComponent],
})
export class ProductFeatureProductDetailsModule {}
