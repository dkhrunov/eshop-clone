import { Injectable } from '@angular/core';
import { CountriesService } from '@esc/shared/util-services';
import { RegisterUserFacade, UserService } from '@esc/user/domain';
import { tap } from 'rxjs';
import { ShopCartFacade } from './shop-cart.facade';

@Injectable({ providedIn: 'root' })
export class ShopCheckoutFacade {
  constructor(
    private shopCartFacade: ShopCartFacade,
    private countriesService: CountriesService
  ) {}

  totalItemsPrice$ = this.shopCartFacade.totalItemsPrice$;

  cartWithProducts$ = this.shopCartFacade.cartWithProducts$.pipe(
    tap((items) => {
      console.log(items);
    })
  );

  countries$ = this.countriesService.countries$;
}
