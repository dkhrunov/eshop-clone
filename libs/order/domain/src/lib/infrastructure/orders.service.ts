import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AbstractRestService, CountResponse } from '@esc/shared/util-models';
import { OrderEntity, CreateOrderDto } from '@esc/order/models';
import { ORDERS_URL } from './orderUrl.token';
import { pluck } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends AbstractRestService<
  OrderEntity,
  CreateOrderDto
> {
  constructor(http: HttpClient, @Inject(ORDERS_URL) url: string) {
    super(http, url);
  }

  orderCount$ = this.http
    .get<CountResponse>(`${this.resourceUrl}/count`)
    .pipe(pluck('order_count'));

  totalSales$ = this.http
    .get<CountResponse>(`${this.resourceUrl}/totalsales`)
    .pipe(pluck('total_sales'));
}
