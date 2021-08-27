import {
  Body,
  Controller,
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
} from '@esc/user/entities';
import { UpdateResult } from 'typeorm';

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
}
