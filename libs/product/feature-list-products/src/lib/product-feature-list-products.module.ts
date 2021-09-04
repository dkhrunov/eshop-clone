import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { ListProductsComponent } from './list-products.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListProductsComponent,
      },
    ]),
  ],
  declarations: [ListProductsComponent],
  exports: [ListProductsComponent],
})
export class ProductFeatureListProductsModule {}
