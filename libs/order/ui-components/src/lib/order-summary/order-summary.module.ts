import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderSummaryComponent } from './order-summary.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OrderSummaryComponent],
  imports: [CommonModule, NzButtonModule, RouterModule],
  exports: [OrderSummaryComponent],
})
export class OrderSummaryModule {}
