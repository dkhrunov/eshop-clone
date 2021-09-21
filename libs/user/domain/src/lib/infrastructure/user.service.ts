import { Inject, Injectable } from '@angular/core';
import { AbstractRestService } from '@esc/shared/util-models';
import { RegisterUserDto, UserEntity } from '@esc/user/models';
import { HttpClient } from '@angular/common/http';
import { USERS_URL } from './usersUrl.token';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractRestService<
  UserEntity,
  RegisterUserDto
> {
  constructor(protected http: HttpClient, @Inject(USERS_URL) url: string) {
    super(http, url);
  }
}
