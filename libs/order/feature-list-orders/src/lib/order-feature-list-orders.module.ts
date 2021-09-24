import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { ListOrdersComponent } from './list-orders.component';
import { RouterModule } from '@angular/router';
import { ButtonBarModule, MainWrapperModule } from '@esc/shared/ui-components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    ButtonBarModule,
    MainWrapperModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    RouterModule.forChild([{ path: '', component: ListOrdersComponent }]),
  ],
  declarations: [ListOrdersComponent],
  exports: [ListOrdersComponent],
})
export class OrderFeatureListOrdersModule {}
