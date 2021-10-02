import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  merge,
  tap,
  mapTo,
  catchError,
  of,
  delay,
  shareReplay,
  Subject,
} from 'rxjs';
import { RegisterUserFacade } from '@esc/user/domain';
import { LoginUserFacade } from '@esc/user/domain';

@Component({
  selector: 'user-shop-auth',
  templateUrl: './shop-auth.component.html',
  styleUrls: ['./shop-auth.component.less'],
})
export class ShopAuthComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private registerUserFacade: RegisterUserFacade,
    private loginUserFacade: LoginUserFacade
  ) {}

  private authModeSubject = new BehaviorSubject<'register' | 'login'>('login');
  authModeAction$ = this.authModeSubject.asObservable();

  authMode$ = merge(
    this.route.fragment.pipe(shareReplay()),
    this.authModeAction$
  );

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loadingAction$ = this.loadingSubject.asObservable();

  loading$ = merge(
    this.loadingAction$,
    this.registerUserFacade.registeredUser$.pipe(
      tap(() => {
        this.toggleAuthMode();
      }),
      mapTo(false),
      catchError(() => of(false))
    ),
    this.loginUserFacade.loggedInUser$.pipe(
      delay(500),
      tap(() => {
        this.router.navigate(['profile']);
      }),
      mapTo(false),
      catchError(() => of(false))
    )
  );

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConfirmation: ['', [Validators.required]],
  });

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerUser(): void {
    if (this.registerForm.valid) {
      this.loadingSubject.next(true);
      this.registerUserFacade.registerUser(this.registerForm.getRawValue());
    }
  }

  loginUser(): void {
    this.loadingSubject.next(true);
    this.loginForm.valid &&
      this.loginUserFacade.loginUser(this.loginForm.getRawValue());
  }

  toggleAuthMode(): void {
    if (this.authModeSubject.getValue() === 'register') {
      this.authModeSubject.next('login');
    } else {
      this.authModeSubject.next('register');
    }
    this.loginForm.reset();
    this.registerForm.reset();
    this.loadingSubject.next(false);
  }
}
