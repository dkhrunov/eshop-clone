import { UserEntity } from '@esc/user/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApiController } from './user-api.controller';
import { UserApiService } from './user-api.service';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService],
  exports: [UserApiService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserApiModule {}
