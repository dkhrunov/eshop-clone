import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { RouterModule } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    NzFormModule,
    NzBadgeModule,
    RouterModule,
    NzDropDownModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
