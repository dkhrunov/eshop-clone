import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USERS_URL } from './infrastructure/usersUrl.token';
import {
  LocalStorageService,
  LOCALSTORAGE_SERVICE,
} from '@esc/shared/util-services';

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: USERS_URL,
      useValue: 'users',
    },
    {
      provide: LOCALSTORAGE_SERVICE,
      useClass: LocalStorageService,
    },
  ],
})
export class UserDomainModule {}
