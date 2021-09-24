import { Component } from '@angular/core';
import { ListOrdersFacade } from '@esc/order/domain';
import { tap } from 'rxjs';

@Component({
  selector: 'order-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.less'],
})
export class ListOrdersComponent {
  constructor(private listOrdersFacade: ListOrdersFacade) {}

  orders$ = this.listOrdersFacade.orders$.pipe(tap(console.log));
}
