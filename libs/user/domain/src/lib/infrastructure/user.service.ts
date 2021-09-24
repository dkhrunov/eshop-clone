import { Inject, Injectable } from '@angular/core';
import { AbstractRestService } from '@esc/shared/util-models';
import {
  LoginResponse,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '@esc/user/models';
import { HttpClient } from '@angular/common/http';
import { USERS_URL } from './usersUrl.token';
import { Observable, Subject, switchMap } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractRestService<
  UserEntity,
  RegisterUserDto
> {
  constructor(http: HttpClient, @Inject(USERS_URL) url: string) {
    super(http, url);
  }

  private loginUserSubject = new Subject<LoginUserDto>();
  loginUserAction$ = this.loginUserSubject.asObservable();

  loggedInUser$ = this.loginUserAction$.pipe(
    switchMap((user) => this.loginUserOnServer(user))
  );

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
