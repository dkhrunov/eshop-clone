import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MainWrapperModule } from '@esc/shared/ui-components';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    MainWrapperModule,
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class OrderFeatureDashboardModule {}
