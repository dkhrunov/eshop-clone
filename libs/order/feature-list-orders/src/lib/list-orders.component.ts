import { Component } from '@angular/core';
import { ListOrdersFacade } from '@esc/order/domain';
import { OrderEntity } from '@esc/order/models';
import { BehaviorSubject, delay, tap } from 'rxjs';

@Component({
  selector: 'order-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.less'],
})
export class ListOrdersComponent {
  constructor(private listOrdersFacade: ListOrdersFacade) {}

  editMode = false;
  selectedOrder: OrderEntity | undefined = undefined;
  selectedOrderItems:
    | {
        name: string;
        brand: string;
        price: number;
        quantity: number;
      }[] = [];

  orders$ = this.listOrdersFacade.orders$.pipe(
    delay(600),
    tap(() => this.updateStatusLoadingSubject.next(false))
  );
  orderStatuses = ['PENDING', 'SHIPPED', 'DELIVERED', 'PROCESSED', 'FAILED'];

  private updateStatusLoadingSubject = new BehaviorSubject<boolean>(false);
  updateStatusLoading$ = this.updateStatusLoadingSubject.asObservable();

  showOrder(order: OrderEntity): void {
    this.selectedOrder = order;
    this.selectedOrderItems = this.selectedOrder.orderItems.map((item) => {
      return {
        name: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
      };
    });

    this.editMode = true;
  }

  updateOrderStatus(status: string): void {
    if (this.selectedOrder && status) {
      this.updateStatusLoadingSubject.next(true);
      this.listOrdersFacade.updateOrderStatus(this.selectedOrder.id, status);
    }
  }

  closeOrder(): void {
    this.selectedOrder = undefined;
    this.selectedOrderItems = [];
    this.editMode = false;
    this.updateStatusLoadingSubject.next(false);
  }

  deleteOrder(id: string): void {
    this.listOrdersFacade.deleteOrder(id);
  }
}
