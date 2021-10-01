import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './order-summary.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [OrderSummaryComponent],
  imports: [CommonModule, NzButtonModule],
  exports: [OrderSummaryComponent],
})
export class OrderSummaryModule {}
