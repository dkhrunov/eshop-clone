import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@esc/shared/util-guards';

@NgModule({
  imports: [
    CommonModule,
    UserDomainModule,
    RouterModule.forChild([
      {
        path: 'login',
        loadChildren: () =>
          import('@esc/user/feature-login-user').then(
            (m) => m.UserFeatureLoginUserModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('@esc/user/feature-register-user').then(
            (m) => m.UserFeatureRegisterUserModule
          ),
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@esc/user/feature-list-users').then(
            (m) => m.UserFeatureListUsersModule
          ),
      },
    ]),
  ],
})
export class UserFeatureShellModule {}
