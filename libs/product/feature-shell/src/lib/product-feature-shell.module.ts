import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './shell.component';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    RouterModule.forChild([
      {
        path: 'products',
        loadChildren: () =>
          import('@esc/product/feature-list-products').then(
            (m) => m.ProductFeatureListProductsModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('@esc/product/feature-list-categories').then(
            (m) => m.ProductFeatureListCategoriesModule
          ),
      },
    ]),
  ],
  declarations: [ShellComponent],
  exports: [ShellComponent],
})
export class ProductFeatureShellModule {}
