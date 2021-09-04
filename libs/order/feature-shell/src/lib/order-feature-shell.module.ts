import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@esc/order/feature-dashboard').then(
            (m) => m.OrderFeatureDashboardModule
          ),
      },
      {
        path: 'orders',
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
  declarations: [ShellComponent],
  exports: [ShellComponent],
})
export class OrderFeatureShellModule {}
