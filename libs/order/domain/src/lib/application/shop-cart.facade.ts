import { Injectable } from '@angular/core';
import { CartItem, CartItemWithProduct } from '@esc/order/models';
import { ProductsService } from '@esc/product/domain';
import { ProductEntity } from '@esc/product/models';
import { CartStorageService } from '@esc/shared/util-services';
import { combineLatest, map, mergeAll, pluck } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShopCartFacade {
  constructor(
    private cartStorageService: CartStorageService,
    private productService: ProductsService
  ) {}

  itemsInCartCount$ = this.cartStorageService.itemsInCartCount$;

  cartItems$ = this.cartStorageService.cart$.pipe(pluck('items'));

  productsInCart$ = this.cartItems$.pipe(
    map((ids) => {
      const products = ids.map((item) =>
        this.productService.getResourceFromServer(item.productId)
      );

      return combineLatest(products);
    }),
    mergeAll()
  );

  cartWithProducts$ = combineLatest([
    this.cartItems$,
    this.productsInCart$,
  ]).pipe(
    map(([ids, products]) => {
      return this.mapProductsToIds(products, ids);
    })
  );

  totalItemsPrice$ = this.cartWithProducts$.pipe(
    map((prices) => {
      return prices
        .map(({ product: { price }, quantity }) => price * quantity)
        .reduce((acc, price) => (acc += price), 0);
    })
  );

  private mapProductsToIds(
    products: ProductEntity[],
    items: CartItem[]
  ): CartItemWithProduct[] {
    return items.map(({ productId, quantity }) => {
      return {
        product: products.find(
          (product) => product.id === productId
        ) as ProductEntity,
        quantity,
      };
    });
  }
}
