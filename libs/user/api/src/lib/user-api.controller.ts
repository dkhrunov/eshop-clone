import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
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

  @Get()
  listUsers(): Promise<UserEntity[]> {
    return this.userApiService.listUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userApiService.getUserById(id);
  }
}
