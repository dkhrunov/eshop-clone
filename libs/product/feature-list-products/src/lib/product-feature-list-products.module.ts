import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { ListProductsComponent } from './list-products.component';
import { RouterModule } from '@angular/router';
import { MainWrapperModule, ButtonBarModule } from '@esc/shared/ui-components';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
    ButtonBarModule,
    NzButtonModule,
  ],
  declarations: [ListProductsComponent],
  exports: [ListProductsComponent],
})
export class ProductFeatureListProductsModule {}
