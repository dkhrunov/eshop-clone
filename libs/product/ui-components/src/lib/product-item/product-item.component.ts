import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ProductEntity } from '@esc/product/models';
import { CartStorageService } from '@esc/shared/util-services';
import { CartItem } from '@esc/order/models';

@Component({
  selector: 'ui-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItemComponent {
  constructor(
    private router: Router,
    private cartStorageService: CartStorageService
  ) {}

  @Input() product!: ProductEntity;

  addToCart(id: string): void {
    const cartItem: CartItem = {
      productId: id,
      quantity: 1,
    };
    this.cartStorageService.setCartItem(cartItem);
  }

  goToProductPage(id: string): void {
    this.router.navigate(['products', id]);
  }
}
