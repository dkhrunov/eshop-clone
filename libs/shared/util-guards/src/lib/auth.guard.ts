import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  TokenStorageService,
  TOKENSTORAGE_SERVICE,
} from '@esc/shared/util-services';
import { JwtUserPayload } from '@esc/user/models';
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
      const [, tokenPayload] = token.split('.');
      const { isAdmin, exp } = JSON.parse(atob(tokenPayload)) as JwtUserPayload;

      if (exp) {
        if (isAdmin && !this.isTokenExpired(exp)) return true;
      }
    }

    this.router.navigate(['login']);
    return false;
  }

  isTokenExpired(exp: number): boolean {
    return Math.floor(new Date().getTime() / 1000) >= exp;
  }
}
