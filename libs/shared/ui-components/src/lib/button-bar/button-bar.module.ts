import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBarComponent } from './button-bar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ButtonBarComponent],
  imports: [CommonModule, NzButtonModule, NzIconModule, RouterModule],
  exports: [ButtonBarComponent],
})
export class ButtonBarModule {}
