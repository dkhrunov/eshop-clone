import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShopCartFacade } from '@esc/order/domain';
import { CartItem } from '@esc/order/models';
import { CartStorageService } from '@esc/shared/util-services';

@Component({
  selector: 'order-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCartComponent {
  constructor(
    private shopCardFacade: ShopCartFacade,
    private cartStorageService: CartStorageService
  ) {}

  itemsInCartCount$ = this.shopCardFacade.itemsInCartCount$;

  cartWithProducts$ = this.shopCardFacade.cartWithProducts$;

  totalItemsPrice$ = this.shopCardFacade.totalItemsPrice$;

  itemsPluralMapping: { [k: string]: string } = {
    '=0': 'No items.',
    '=1': '1 item.',
    other: '# items.',
  };

  deleteOrderItem(id: string): void {
    this.cartStorageService.removeCartItem(id);
  }

  changeItemQuantity({ productId, quantity }: CartItem): void {
    const newItem = {
      productId,
      quantity,
    };
    this.cartStorageService.setCartItem(newItem, true);
  }
}
