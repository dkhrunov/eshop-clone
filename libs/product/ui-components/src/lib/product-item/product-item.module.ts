import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProductItemComponent } from './product-item.component';

@NgModule({
  declarations: [ProductItemComponent],
  imports: [CommonModule, NzButtonModule, NzIconModule],
  exports: [ProductItemComponent],
})
export class ProductItemModule {}
