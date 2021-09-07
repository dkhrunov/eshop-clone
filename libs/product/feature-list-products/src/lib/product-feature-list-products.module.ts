import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { ListProductsComponent } from './list-products.component';
import { RouterModule } from '@angular/router';
import { MainWrapperModule } from '@esc/shared/ui-components';

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
    MainWrapperModule,
  ],
  declarations: [ListProductsComponent],
  exports: [ListProductsComponent],
})
export class ProductFeatureListProductsModule {}
