import { Module } from '@nestjs/common';
import { UserApiController } from './user-api.controller';
import { UserApiService } from './user-api.service';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService],
  exports: [UserApiService],
})
export class UserApiModule {}
