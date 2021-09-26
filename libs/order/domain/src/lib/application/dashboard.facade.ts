import { Injectable } from '@angular/core';
import { OrdersService } from '../..';
import { ProductsService } from '@esc/product/domain';
import { UserService } from '@esc/user/domain';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  constructor(
    private orderService: OrdersService,
    private productService: ProductsService,
    private userService: UserService
  ) {}

  ordersCount$ = this.orderService.orderCount$;

  productCount$ = this.productService.productCount$;

  userCount$ = this.userService.userCount$;

  totalSales$ = this.orderService.totalSales$;
}
