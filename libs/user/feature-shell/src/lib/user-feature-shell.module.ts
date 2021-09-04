import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    UserDomainModule,
    RouterModule.forChild([
      {
        path: 'users',
        loadChildren: () =>
          import('@esc/user/feature-list-users').then(
            (m) => m.UserFeatureListUsersModule
          ),
      },
    ]),
  ],
  declarations: [ShellComponent],
  exports: [ShellComponent],
})
export class UserFeatureShellModule {}
