import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserFacade } from '@esc/user/domain';
import { BehaviorSubject, mapTo, merge, tap, catchError, of } from 'rxjs';

@Component({
  selector: 'user-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.less'],
})
export class LoginUserComponent {
  constructor(
    private loginUserFacade: LoginUserFacade,
    private fb: FormBuilder,
    private router: Router
  ) {}

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loadingAction$ = this.loadingSubject.asObservable();

  loading$ = merge(
    this.loadingAction$,
    this.loginUserFacade.loggedInUser$.pipe(
      tap(() => {
        this.router.navigate(['dashboard']);
      }),
      mapTo(false),
      catchError(() => of(false))
    )
  );

  form = this.fb.group({
    email: ['iromashko@me.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
  });

  loginUser(): void {
    this.loadingSubject.next(true);
    this.form.valid && this.loginUserFacade.loginUser(this.form.getRawValue());
  }
}
