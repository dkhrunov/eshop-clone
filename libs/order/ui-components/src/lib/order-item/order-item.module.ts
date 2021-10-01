import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from './order-item.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [OrderItemComponent],
  imports: [
    CommonModule,
    NzInputNumberModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
  ],
  exports: [OrderItemComponent],
})
export class OrderItemModule {}
