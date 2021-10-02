import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '@esc/shared/util-services';
import { RegisterUserFacade, UserService } from '@esc/user/domain';
import { BehaviorSubject, delay, mapTo, merge, of, tap } from 'rxjs';

@Component({
  selector: 'user-shop-user-profile',
  templateUrl: './shop-user-profile.component.html',
  styleUrls: ['./shop-user-profile.component.less'],
})
export class ShopUserProfileComponent {
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private userService: UserService
  ) {}

  updatedUser$ = this.userService.updated$;

  private formIsUpdatingSubject = new BehaviorSubject<boolean>(false);
  formIsUpdating$ = merge(
    this.formIsUpdatingSubject.asObservable(),
    this.updatedUser$.pipe(delay(500), mapTo(false))
  );

  countries$ = this.countriesService.countries$;

  currentUserId = '';

  currentUserInfo$ = this.userService.currentUserInfo$.pipe(
    tap((userInfo) => {
      this.currentUserId = userInfo.id;
      this.userForm.patchValue({ ...userInfo });
    })
  );

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    street: ['', [Validators.required]],
    apartment: ['', [Validators.required]],
    zip: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
  });

  updateUser(): void {
    this.formIsUpdatingSubject.next(true);
    this.userService.update(this.currentUserId, this.userForm.getRawValue());
  }
}
