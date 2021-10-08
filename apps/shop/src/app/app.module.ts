import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardModule } from '@esc/shared/ui-components';
import { UserFeatureShellModule } from '@esc/user/feature-shell';
import { RouterModule } from '@angular/router';
import { HeaderModule, FooterModule } from '@esc/shared/ui-components';
import { HomeComponent } from './home.component';
import { BannerModule } from '@esc/shared/ui-components';
import { CategoriesBannerModule } from '@esc/product/ui-components';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProductItemModule } from '@esc/product/ui-components';
import { CATEGORIES_URL, PRODUCTS_URL } from '@esc/product/domain';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartStorageService } from '@esc/shared/util-services';
import { AuthGuard } from '@esc/shared/util-guards';
import { AuthInterceptor } from '@esc/shared/util-interceptors';
import { ORDERS_URL } from '@esc/order/domain';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule,
    HeaderModule,
    FooterModule,
    BannerModule,
    ProductItemModule,
    NzIconModule,
    NgProgressModule.withConfig({ spinner: false }),
    NgProgressHttpModule,
    BrowserAnimationsModule,
    CategoriesBannerModule,
    UserFeatureShellModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'products',
        loadChildren: () =>
          import('@esc/product/feature-shop-products').then(
            (m) => m.ProductFeatureShopProductsModule
          ),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@esc/user/feature-shop-user-profile').then(
            (m) => m.UserFeatureShopUserProfileModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('@esc/user/feature-shop-auth').then(
            (m) => m.UserFeatureShopAuthModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('@esc/order/feature-shop-cart').then(
            (m) => m.OrderFeatureShopCartModule
          ),
      },
      {
        path: 'checkout',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@esc/order/feature-shop-checkout').then(
            (m) => m.OrderFeatureShopCheckoutModule
          ),
      },
      {
        path: 'products/:id',
        loadChildren: () =>
          import('@esc/product/feature-product-details').then(
            (m) => m.ProductFeatureProductDetailsModule
          ),
      },
    ]),
  ],
  providers: [
    { provide: CATEGORIES_URL, useValue: 'categories' },
    { provide: PRODUCTS_URL, useValue: 'products' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: ORDERS_URL,
      useValue: 'orders',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(cartStorageService: CartStorageService) {
    cartStorageService.initCartLocalStorage();
  }
}
