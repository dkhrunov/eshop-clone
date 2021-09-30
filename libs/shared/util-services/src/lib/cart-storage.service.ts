import { Injectable } from '@angular/core';
import { Cart, CartItem } from '@esc/order/models';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  private cartSubject = new BehaviorSubject<Cart>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  initialCart = {
    items: [],
  };

  initCartLocalStorage() {
    const cart: Cart = this.getCart();

    !cart.items.length &&
      localStorage.setItem(CART_KEY, JSON.stringify(this.initialCart));

    this.cartSubject.next(cart);
  }

  setCartItem(cartItem: CartItem): Cart {
    const cart: Cart = this.getCart();
    const foundItem = cart.items?.find(
      (item) => item.productId === cartItem.productId
    );

    foundItem
      ? this.increaseItemInCart(cart, cartItem)
      : cart.items.push(cartItem);

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    this.cartSubject.next(cart);
    return cart;
  }

  private getCart(): Cart {
    const cart: Cart =
      JSON.parse(localStorage.getItem(CART_KEY) as string) ?? this.initialCart;
    return cart;
  }

  private increaseItemInCart(cart: Cart, newItem: CartItem): void {
    cart.items.map((itemInCart) => {
      if (itemInCart.productId === newItem.productId) {
        itemInCart.quantity += newItem.quantity;
      }
      return itemInCart;
    });
  }
}
