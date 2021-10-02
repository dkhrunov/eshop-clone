import { Inject, Injectable } from '@angular/core';
import { AbstractRestService, CountResponse } from '@esc/shared/util-models';
import {
  LoginResponse,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '@esc/user/models';
import { HttpClient } from '@angular/common/http';
import { USERS_URL } from './usersUrl.token';
import {
  iif,
  map,
  mapTo,
  merge,
  Observable,
  of,
  pluck,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { environment } from '@env/environment';
import { TokenStorageService } from '@esc/shared/util-services';
import { isTokenExpired } from '@esc/shared/util-helpers';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractRestService<
  UserEntity,
  RegisterUserDto
> {
  constructor(
    http: HttpClient,
    @Inject(USERS_URL) url: string,
    private tokenStorageService: TokenStorageService
  ) {
    super(http, url);
  }

  userCount$ = this.http
    .get<CountResponse>(`${this.resourceUrl}/count`)
    .pipe(pluck('user_count'));

  private loginUserSubject = new Subject<LoginUserDto>();
  loginUserAction$ = this.loginUserSubject.asObservable();

  loggedInUser$ = this.loginUserAction$.pipe(
    switchMap((user) => this.loginUserOnServer(user))
  );

  private logOutUserSubject = new Subject();
  logoutUserAction$ = this.logOutUserSubject.asObservable();

  isUserLoggedIn$ = merge(
    of(this.tokenStorageService.getToken()).pipe(
      map((token) => {
        if (token) {
          return isTokenExpired(token);
        } else {
          return false;
        }
      })
    ),
    this.logoutUserAction$.pipe(mapTo(false)),
    this.loggedInUser$.pipe(mapTo(true))
  );

  logoutUser(): void {
    this.logOutUserSubject.next(null);
  }

  loginUser(user: LoginUserDto): void {
    this.loginUserSubject.next(user);
  }

  private loginUserOnServer(user: LoginUserDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.baseUrlApi}/users/login`,
      user
    );
  }
}
