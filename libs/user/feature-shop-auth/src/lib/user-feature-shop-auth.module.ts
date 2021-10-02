import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { ShopAuthComponent } from './shop-auth.component';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';

import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    CommonModule,
    UserDomainModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    RouterModule.forChild([{ path: '', component: ShopAuthComponent }]),
  ],
  declarations: [ShopAuthComponent],
  exports: [ShopAuthComponent],
})
export class UserFeatureShopAuthModule {}
