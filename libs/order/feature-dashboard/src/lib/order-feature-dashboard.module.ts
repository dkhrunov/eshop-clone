import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MainWrapperModule } from '@esc/shared/ui-components';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DashboardCardModule } from '@esc/order/ui-components';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    NzStatisticModule,
    NzCardModule,
    NzIconModule,
    DashboardCardModule,
    RouterModule.forChild([{ path: '', component: DashboardComponent }]),
    MainWrapperModule,
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
})
export class OrderFeatureDashboardModule {}
