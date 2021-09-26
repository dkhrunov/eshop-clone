import { Component } from '@angular/core';
import { DashboardFacade } from '@esc/order/domain';
import { delay } from 'rxjs';

@Component({
  selector: 'order-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent {
  constructor(private dashboardFacade: DashboardFacade) {}

  ordersCount$ = this.dashboardFacade.ordersCount$.pipe(delay(400));

  productCount$ = this.dashboardFacade.productCount$.pipe(delay(400));

  userCount$ = this.dashboardFacade.userCount$.pipe(delay(400));

  totalSales$ = this.dashboardFacade.totalSales$.pipe(delay(400));
}
