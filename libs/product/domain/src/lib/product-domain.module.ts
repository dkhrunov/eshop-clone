import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [CommonModule, HttpClientModule, NzNotificationModule],
})
export class ProductDomainModule {}
