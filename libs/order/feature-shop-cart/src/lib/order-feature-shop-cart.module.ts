import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { ShopCartComponent } from './shop-cart.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { OrderItemModule, OrderSummaryModule } from '@esc/order/ui-components';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    NzButtonModule,
    NzIconModule,
    OrderItemModule,
    OrderSummaryModule,
    RouterModule.forChild([{ path: '', component: ShopCartComponent }]),
  ],
  declarations: [ShopCartComponent],
  exports: [ShopCartComponent],
})
export class OrderFeatureShopCartModule {}
