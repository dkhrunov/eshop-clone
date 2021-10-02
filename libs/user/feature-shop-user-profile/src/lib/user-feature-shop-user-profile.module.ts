import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { ShopUserProfileComponent } from './shop-user-profile.component';
import { RouterModule } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UserDomainModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzAlertModule,
    NzSpinModule,
    RouterModule.forChild([{ path: '', component: ShopUserProfileComponent }]),
  ],
  declarations: [ShopUserProfileComponent],
  exports: [ShopUserProfileComponent],
})
export class UserFeatureShopUserProfileModule {}
