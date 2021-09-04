import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class OrderFeatureDashboardModule {}
