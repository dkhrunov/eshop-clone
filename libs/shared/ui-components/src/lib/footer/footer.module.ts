import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, NzIconModule],
  exports: [FooterComponent],
})
export class FooterModule {}
