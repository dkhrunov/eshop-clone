import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { ListCategoriesComponent } from './list-categories.component';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    RouterModule.forChild([{ path: '', component: ListCategoriesComponent }]),
    NzCardModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
  ],
  declarations: [ListCategoriesComponent],
  exports: [ListCategoriesComponent],
})
export class ProductFeatureListCategoriesModule {}
