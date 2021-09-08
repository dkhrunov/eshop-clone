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
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ButtonBarModule, MainWrapperModule } from '@esc/shared/ui-components';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    RouterModule.forChild([
      { path: '', component: ListCategoriesComponent },
      {
        path: 'form',
        loadChildren: () =>
          import('@esc/product/ui-components').then(
            (m) => m.CategoriesFormModule
          ),
      },
    ]),
    NzCardModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzSpaceModule,
    ButtonBarModule,
    MainWrapperModule,
    NzPopconfirmModule,
  ],
  declarations: [ListCategoriesComponent],
  exports: [ListCategoriesComponent],
})
export class ProductFeatureListCategoriesModule {}
