import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CountriesService } from '@esc/shared/util-services';

@Component({
  selector: 'user-shop-user-profile',
  templateUrl: './shop-user-profile.component.html',
  styleUrls: ['./shop-user-profile.component.less'],
})
export class ShopUserProfileComponent {
  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  countries$ = this.countriesService.countries$;

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
}
