import { Inject, Injectable } from '@angular/core';
import { LoginUserDto } from '@esc/user/models';
import { UserService } from '../..';
import {
  TokenStorageService,
  TOKENSTORAGE_SERVICE,
} from '@esc/shared/util-services';
import { pluck, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginUserFacade {
  constructor(
    private userService: UserService,
    @Inject(TOKENSTORAGE_SERVICE)
    private tokenStorageService: TokenStorageService
  ) {}

  loggedInUser$ = this.userService.loggedInUser$.pipe(
    pluck('token'),
    tap(this.tokenStorageService.setToken)
  );

  loginUser(user: LoginUserDto): void {
    this.userService.loginUser(user);
  }

  logout(): void {
    this.tokenStorageService.clearToken();
    this.userService.logoutUser();
  }
}
