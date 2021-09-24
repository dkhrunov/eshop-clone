import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@esc/shared/util-guards';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    RouterModule.forChild([
      {
        path: 'products',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@esc/product/feature-list-products').then(
            (m) => m.ProductFeatureListProductsModule
          ),
      },
      {
        path: 'categories',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@esc/product/feature-list-categories').then(
            (m) => m.ProductFeatureListCategoriesModule
          ),
      },
    ]),
  ],
})
export class ProductFeatureShellModule {}
