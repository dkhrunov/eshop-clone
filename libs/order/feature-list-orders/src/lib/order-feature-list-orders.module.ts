import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { ListOrdersComponent } from './list-orders.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    RouterModule.forChild([{ path: '', component: ListOrdersComponent }]),
  ],
  declarations: [ListOrdersComponent],
  exports: [ListOrdersComponent],
})
export class OrderFeatureListOrdersModule {}
