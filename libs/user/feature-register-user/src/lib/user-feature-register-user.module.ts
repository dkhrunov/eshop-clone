import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { RegisterUserComponent } from './register-user.component';

@NgModule({
  imports: [CommonModule, UserDomainModule],
  declarations: [RegisterUserComponent],
  exports: [RegisterUserComponent],
})
export class UserFeatureRegisterUserModule {}
