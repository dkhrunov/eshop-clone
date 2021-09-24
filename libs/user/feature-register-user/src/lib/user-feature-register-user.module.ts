import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { RegisterUserComponent } from './register-user.component';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    CommonModule,
    UserDomainModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterUserComponent,
      },
    ]),
  ],
  declarations: [RegisterUserComponent],
  exports: [RegisterUserComponent],
})
export class UserFeatureRegisterUserModule {}
