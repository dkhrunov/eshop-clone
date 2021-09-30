import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsFacade } from '@esc/product/domain';
import {
  combineLatest,
  filter,
  map,
  pluck,
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { CartStorageService } from '@esc/shared/util-services';
@Component({
  selector: 'product-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less'],
})
export class ProductDetailsComponent {
  constructor(
    private productDetailsFacade: ProductDetailsFacade,
    private route: ActivatedRoute,
    private cartStorageService: CartStorageService
  ) {}

  quantity = 1;
  activeImage = '';

  product$ = combineLatest([
    this.productDetailsFacade.productById$,
    this.route.params.pipe(
      pluck('id'),
      filter(Boolean),
      tap((id) => {
        this.productDetailsFacade.getProductById(id);
      })
    ),
  ]).pipe(
    map(([product]) => product),
    take(1),
    shareReplay(1)
  );

  addItemToCart(productId: string, quantity: number): void {
    this.cartStorageService.setCartItem({ productId, quantity });
  }
}
