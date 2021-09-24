import { Injectable } from '@angular/core';
import { RegisterUserDto } from '@esc/user/models';
import { UserService } from '../..';

@Injectable({ providedIn: 'root' })
export class RegisterUserFacade {
  constructor(private userService: UserService) {}

  registeredUser$ = this.userService.created$;

  registerUser(user: RegisterUserDto): void {
    this.userService.create(user);
  }
}
