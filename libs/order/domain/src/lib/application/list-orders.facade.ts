import { Injectable } from '@angular/core';
import { OrdersService } from '../..';

@Injectable({ providedIn: 'root' })
export class ListOrdersFacade {
  constructor(private ordersService: OrdersService) {}

  orders$ = this.ordersService.resources$;

  deleteOrder(id: string): void {
    this.ordersService.delete(id);
  }

  updateOrderStatus(id: string, status: string): void {
    this.ordersService.update(id, { status });
  }
}
