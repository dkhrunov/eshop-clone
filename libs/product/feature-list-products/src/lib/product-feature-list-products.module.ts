import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { ListProductsComponent } from './list-products.component';
import { RouterModule } from '@angular/router';
import { MainWrapperModule, ButtonBarModule } from '@esc/shared/ui-components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { ProductUiPipesModule } from '@esc/product/ui-pipes';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    ProductUiPipesModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListProductsComponent,
      },
      {
        path: 'form',
        loadChildren: () =>
          import('@esc/product/ui-components').then(
            (m) => m.ProductsFormModule
          ),
      },
    ]),
    MainWrapperModule,
    ButtonBarModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzSkeletonModule,
    NzPopconfirmModule,
  ],

  declarations: [ListProductsComponent],
  exports: [ListProductsComponent],
})
export class ProductFeatureListProductsModule {}
