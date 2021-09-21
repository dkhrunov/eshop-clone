import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USERS_URL } from './infrastructure/usersUrl.token';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: USERS_URL,
      useValue: 'users',
    },
  ],
})
export class UserDomainModule {}
