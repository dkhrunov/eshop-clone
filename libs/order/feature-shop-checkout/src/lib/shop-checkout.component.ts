import { Component } from '@angular/core';
import { OrdersService, ShopCheckoutFacade } from '@esc/order/domain';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@esc/user/domain';
import { BehaviorSubject, mapTo, merge, tap } from 'rxjs';
import { CreateOrderDto, OrderItem } from '@esc/order/models';
import { CartStorageService } from '@esc/shared/util-services';

@Component({
  selector: 'order-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.less'],
})
export class ShopCheckoutComponent {
  constructor(
    private shopCheckoutFacade: ShopCheckoutFacade,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrdersService,
    private cartStorageService: CartStorageService
  ) {}

  orderItems: OrderItem[] = [];

  private editModeSubject = new BehaviorSubject<boolean>(true);
  editMode$ = merge(
    this.editModeSubject.asObservable(),
    this.userService.currentUserInfo$.pipe(
      tap((userInfo) => this.checkoutForm.patchValue({ ...userInfo })),
      mapTo(true)
    )
  );

  currentUserInfo$ = this.userService.currentUserInfo$.pipe(
    tap((userInfo) => this.checkoutForm.patchValue({ ...userInfo }))
  );

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    street: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });

  createdOrder$ = this.orderService.created$.pipe(
    tap(() => {
      this.editModeSubject.next(false);
      this.cartStorageService.initCartLocalStorage(true);
    })
  );

  countries$ = this.shopCheckoutFacade.countries$;

  totalItemsPrice$ = this.shopCheckoutFacade.totalItemsPrice$;

  cartWithProducts$ = this.shopCheckoutFacade.cartWithProducts$.pipe(
    tap((products) => {
      this.orderItems = products;
    })
  );

  placeOrder(): void {
    const orderValues = this.checkoutForm.getRawValue();

    const newOrder: CreateOrderDto = {
      orderItems: this.orderItems,
      city: orderValues.city,
      country: orderValues.country,
      zip: orderValues.zip,
      phone: orderValues.phone,
      shippingAddressOne: `${orderValues.street} / ${orderValues.apartment}`,
      shippingAddressTwo: `None`,
    };

    this.checkoutForm.valid && this.orderService.placeOrder(newOrder);
  }
}
