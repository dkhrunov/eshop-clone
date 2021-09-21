import { Injectable } from '@angular/core';
import { RegisterUserDto, UpdateUserDto } from '@esc/user/models';
import { UserService } from '../infrastructure/user.service';

@Injectable({ providedIn: 'root' })
export class ListUsersFacade {
  constructor(private usersService: UserService) {}

  users$ = this.usersService.resources$;

  registeredUser$ = this.usersService.created$;

  deleteUser(id: string): void {
    this.usersService.delete(id);
  }

  registerUser(user: RegisterUserDto): void {
    this.usersService.create(user);
  }

  updateUser(id: string, user: UpdateUserDto): void {
    this.usersService.update(id, user);
  }
}
