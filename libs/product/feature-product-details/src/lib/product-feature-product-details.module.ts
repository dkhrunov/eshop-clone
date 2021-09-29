import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDomainModule } from '@esc/product/domain';
import { ProductDetailsComponent } from './product-details.component';
import { RouterModule } from '@angular/router';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    ProductDomainModule,
    NzRateModule,
    FormsModule,
    NzDividerModule,
    NzSelectModule,
    NzButtonModule,
    RouterModule.forChild([{ path: '', component: ProductDetailsComponent }]),
  ],
  declarations: [ProductDetailsComponent],
  exports: [ProductDetailsComponent],
})
export class ProductFeatureProductDetailsModule {}
