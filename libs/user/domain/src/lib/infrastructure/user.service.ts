import { Inject, Injectable } from '@angular/core';
import { AbstractRestService, CountResponse } from '@esc/shared/util-models';
import {
  JwtUserPayload,
  LoginResponse,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
  UserFromServer,
} from '@esc/user/models';
import { HttpClient } from '@angular/common/http';
import { USERS_URL } from './usersUrl.token';
import {
  map,
  mapTo,
  merge,
  Observable,
  of,
  pluck,
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

  currentUserToken$ = of(this.tokenStorageService.getToken());

  private logOutUserSubject = new Subject();
  logoutUserAction$ = this.logOutUserSubject.asObservable();

  isUserLoggedIn$ = merge(
    this.currentUserToken$.pipe(
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

  currentUserInfo$ = this.currentUserToken$.pipe(
    switchMap((token) => {
      if (token) {
        const [, tokenPayload] = token.split('.');
        const { userId } = JSON.parse(atob(tokenPayload)) as JwtUserPayload;

        console.log(userId);

        return this.http.get<UserFromServer>(
          `${environment.baseUrlApi}/users/${userId}`
        );
      } else {
        return of({} as UserFromServer);
      }
    })
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
