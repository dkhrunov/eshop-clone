import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDomainModule } from '@esc/order/domain';
import { ListOrdersComponent } from './list-orders.component';
import { RouterModule } from '@angular/router';
import { ButtonBarModule, MainWrapperModule } from '@esc/shared/ui-components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { SharedUiPipesModule } from '@esc/shared/ui-pipes';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OrderDomainModule,
    ButtonBarModule,
    MainWrapperModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzDrawerModule,
    SharedUiPipesModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzSelectModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ListOrdersComponent }]),
  ],
  declarations: [ListOrdersComponent],
  exports: [ListOrdersComponent],
})
export class OrderFeatureListOrdersModule {}
