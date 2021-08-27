import { Body, Controller, Post } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import {
  RegisterUserDto,
  RegisterUserResponse,
  UserEntity,
} from '@esc/user/entities';

@Controller('users')
export class UserApiController {
  constructor(private userApiService: UserApiService) {}

  @Post()
  registerUser(@Body() dto: RegisterUserDto): Promise<RegisterUserResponse> {
    return this.userApiService.registerUser(dto);
  }
}
