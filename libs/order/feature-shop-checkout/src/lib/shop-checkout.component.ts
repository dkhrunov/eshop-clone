import { Component } from '@angular/core';
import { ShopCheckoutFacade } from '@esc/order/domain';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@esc/user/domain';
import { tap } from 'rxjs';

@Component({
  selector: 'order-shop-checkout',
  templateUrl: './shop-checkout.component.html',
  styleUrls: ['./shop-checkout.component.less'],
})
export class ShopCheckoutComponent {
  constructor(
    private shopCheckoutFacade: ShopCheckoutFacade,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

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

  countries$ = this.shopCheckoutFacade.countries$;

  totalItemsPrice$ = this.shopCheckoutFacade.totalItemsPrice$;

  cartWithProducts$ = this.shopCheckoutFacade.cartWithProducts$;
}
