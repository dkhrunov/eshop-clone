import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@esc/shared/util-guards';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@esc/order/feature-dashboard').then(
            (m) => m.OrderFeatureDashboardModule
          ),
      },
      {
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@esc/order/feature-list-orders').then(
            (m) => m.OrderFeatureListOrdersModule
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ]),
  ],
})
export class OrderFeatureShellModule {}
