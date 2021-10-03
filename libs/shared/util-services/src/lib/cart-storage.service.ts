import { Injectable } from '@angular/core';
import { Cart, CartItem } from '@esc/order/models';
import { BehaviorSubject, map, pluck } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartStorageService {
  private cartSubject = new BehaviorSubject<Cart>(this.getCart());
  cart$ = this.cartSubject.asObservable();

  itemsInCartCount$ = this.cart$.pipe(
    pluck('items'),
    map((items) => items.reduce((acc, item) => acc + item.quantity, 0))
  );

  initialCart = {
    items: [],
  };

  initCartLocalStorage(clear?: boolean) {
    const cart: Cart = this.getCart();

    if (!cart.items.length || clear) {
      localStorage.setItem(CART_KEY, JSON.stringify(this.initialCart));
      return this.cartSubject.next({ items: [] });
    }

    this.cartSubject.next(cart);
  }

  setCartItem(cartItem: CartItem, update?: boolean): void {
    const cart: Cart = this.getCart();
    const foundItem = cart.items?.find(
      (item) => item.productId === cartItem.productId
    );

    foundItem
      ? this.setOrderItems(cart, cartItem, update)
      : cart.items.push(cartItem);

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    this.cartSubject.next(cart);
  }

  removeCartItem(id: string): void {
    const cart = this.getCart();

    const newCartItems = cart.items.filter((item) => item.productId !== id);

    cart.items = newCartItems;

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    this.cartSubject.next(cart);
  }

  private getCart(): Cart {
    const cart: Cart =
      JSON.parse(localStorage.getItem(CART_KEY) as string) ?? this.initialCart;
    return cart;
  }

  private setOrderItems(cart: Cart, newItem: CartItem, update?: boolean): void {
    cart.items.map((itemInCart) => {
      if (itemInCart.productId === newItem.productId) {
        update
          ? (itemInCart.quantity = newItem.quantity)
          : (itemInCart.quantity += newItem.quantity);
      }
      return itemInCart;
    });
    return;
  }
}
