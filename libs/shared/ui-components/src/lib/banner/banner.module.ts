import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [BannerComponent],
  imports: [CommonModule, NzButtonModule, NzIconModule],
  exports: [BannerComponent],
})
export class BannerModule {}
