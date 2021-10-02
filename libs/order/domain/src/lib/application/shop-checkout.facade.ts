import { Injectable } from '@angular/core';
import { CountriesService } from '@esc/shared/util-services';
import { ShopCartFacade } from './shop-cart.facade';

@Injectable({ providedIn: 'root' })
export class ShopCheckoutFacade {
  constructor(
    private shopCartFacade: ShopCartFacade,
    private countriesService: CountriesService
  ) {}

  totalItemsPrice$ = this.shopCartFacade.totalItemsPrice$;

  cartWithProducts$ = this.shopCartFacade.cartWithProducts$;

  countries$ = this.countriesService.countries$;
}
