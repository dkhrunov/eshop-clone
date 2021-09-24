import { Inject, Injectable } from '@angular/core';
import { LoginUserDto } from '@esc/user/models';
import { UserService } from '../..';
import {
  LocalStorageService,
  LOCALSTORAGE_SERVICE,
} from '@esc/shared/util-services';
import { pluck, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginUserFacade {
  constructor(
    private userService: UserService,
    @Inject(LOCALSTORAGE_SERVICE)
    private localStorageService: LocalStorageService
  ) {}

  loggedInUser$ = this.userService.loggedInUser$.pipe(
    pluck('token'),
    tap(this.localStorageService.setToken)
  );

  loginUser(user: LoginUserDto): void {
    this.userService.loginUser(user);
  }

  logout(): void {
    this.localStorageService.clearToken();
  }
}
