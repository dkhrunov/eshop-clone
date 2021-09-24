import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AbstractRestService } from '@esc/shared/util-models';
import { OrderEntity, CreateOrderDto } from '@esc/order/models';
import { ORDERS_URL } from './orderUrl.token';

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
}
