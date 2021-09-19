import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { CATEGORIES_URL } from './infrastructure/categoriesUrl.token';
import { PRODUCTS_URL } from './infrastructure/productsUrl.token';

@NgModule({
  imports: [CommonModule, HttpClientModule, NzNotificationModule],
  providers: [
    { provide: CATEGORIES_URL, useValue: 'categories' },
    { provide: PRODUCTS_URL, useValue: 'products' },
  ],
})
export class ProductDomainModule {}
