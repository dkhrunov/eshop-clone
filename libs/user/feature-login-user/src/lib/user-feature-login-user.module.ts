import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { LoginUserComponent } from './login-user.component';

@NgModule({
  imports: [CommonModule, UserDomainModule],
  declarations: [LoginUserComponent],
  exports: [LoginUserComponent],
})
export class UserFeatureLoginUserModule {}
