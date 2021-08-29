import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserApiService } from './user-api.service';
import {
  RegisterUserDto,
  UserResponse,
  UserEntity,
  UpdateUserDto,
  LoginUserDto,
  LoginResponse,
} from '@esc/user/models';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CountResponse } from '@esc/shared/util-models';

@Controller('users')
export class UserApiController {
  constructor(private userApiService: UserApiService) {}

  @Post()
  registerUser(@Body() dto: RegisterUserDto): Promise<UserResponse> {
    return this.userApiService.registerUser(dto);
  }

  @Get()
  listUsers(): Promise<UserEntity[]> {
    return this.userApiService.listUsers();
  }

  @Get('count')
  getUsersCount(): Promise<CountResponse> {
    return this.userApiService.getUserCount();
  }

  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.userApiService.getUserById(id);
  }

  @Put(':id')
  updateUser(
    @Body() dto: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<UserResponse | UpdateResult> {
    return this.userApiService.updateUser(id, dto);
  }

  @Post('login')
  loginUser(@Body() dto: LoginUserDto): Promise<LoginResponse> {
    return this.userApiService.loginUser(dto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.userApiService.deleteUser(id);
  }
}
