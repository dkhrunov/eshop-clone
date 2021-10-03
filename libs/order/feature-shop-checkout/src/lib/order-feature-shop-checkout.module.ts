import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { ShopCheckoutComponent } from './shop-checkout.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { OrderSummaryModule } from '@esc/order/ui-components';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    NzButtonModule,
    NzIconModule,
    OrderSummaryModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzResultModule,
    RouterModule.forChild([{ path: '', component: ShopCheckoutComponent }]),
  ],
  declarations: [ShopCheckoutComponent],
  exports: [ShopCheckoutComponent],
})
export class OrderFeatureShopCheckoutModule {}
