import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  TokenStorageService,
  TOKENSTORAGE_SERVICE,
} from '@esc/shared/util-services';
import { isTokenExpired } from '@esc/shared/util-helpers';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKENSTORAGE_SERVICE)
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = this.tokenStorageService.getToken();

    if (token) {
      return isTokenExpired(token);
    }

    this.router.navigate(['login']);
    return false;
  }
}
