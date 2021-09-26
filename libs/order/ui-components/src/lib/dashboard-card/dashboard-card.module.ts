import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [DashboardCardComponent],
  imports: [CommonModule, NzIconModule],
  exports: [DashboardCardComponent],
})
export class DashboardCardModule {}
