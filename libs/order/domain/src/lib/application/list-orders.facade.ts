import { Injectable } from '@angular/core';
import { OrdersService } from '../..';

@Injectable({ providedIn: 'root' })
export class ListOrdersFacade {
  constructor(private ordersService: OrdersService) {}

  orders$ = this.ordersService.resources$;
}
