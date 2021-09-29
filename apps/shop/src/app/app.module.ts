import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
