import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDomainModule } from '@esc/user/domain';
import { ListUsersComponent } from './list-users.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    UserDomainModule,
    RouterModule.forChild([{ path: '', component: ListUsersComponent }]),
  ],
  declarations: [ListUsersComponent],
  exports: [ListUsersComponent],
})
export class UserFeatureListUsersModule {}
