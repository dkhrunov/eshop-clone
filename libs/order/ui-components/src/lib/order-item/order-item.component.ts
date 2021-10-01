import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { CartItem, CartItemWithProduct } from '@esc/order/models';

@Component({
  selector: 'ui-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent {
  @Input() item!: CartItemWithProduct;
  @Output() deleteItem = new EventEmitter<string>();
  @Output() changeQuantity = new EventEmitter<CartItem>();

  deleteOrderItem(): void {
    this.deleteItem.emit(this.item.product.id);
  }

  changeItemQuantity(): void {
    const newItem: CartItem = {
      productId: this.item.product.id,
      quantity: this.item.quantity,
    };
    this.changeQuantity.emit(newItem);
  }

  get getSubtotal(): number {
    return this.item?.product?.price * this.item?.quantity;
  }
}
