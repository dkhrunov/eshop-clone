import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ORDERS_URL } from './infrastructure/orderUrl.token';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: ORDERS_URL,
      useValue: 'orders',
    },
  ],
})
export class OrderDomainModule {}
