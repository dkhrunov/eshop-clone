import { Component } from '@angular/core';
import { RegisterUserFacade } from '@esc/user/domain';
import { BehaviorSubject, mapTo, merge, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'user-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.less'],
})
export class RegisterUserComponent {
  constructor(
    private registerUserFacade: RegisterUserFacade,
    private router: Router,
    private fb: FormBuilder
  ) {}

  private loadingSubject = new BehaviorSubject<boolean>(false);
  loadingAction$ = this.loadingSubject.asObservable();

  loading$ = merge(
    this.loadingAction$,
    this.registerUserFacade.registeredUser$.pipe(
      tap((user) => {
        console.log(user);
        this.router.navigate(['login']);
      }),
      mapTo(false),
      catchError(() => of(false))
    )
  );

  form = this.fb.group({
    name: ['iromashko', Validators.required],
    email: ['iromashko5@me.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    passwordConfirmation: ['123456', [Validators.required]],
  });

  registerUser(): void {
    this.loadingSubject.next(true);
    this.form.valid &&
      this.registerUserFacade.registerUser(this.form.getRawValue());
  }
}
