import { UserEntity } from '@esc/user/entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApiController } from './user-api.controller';
import { UserApiService } from './user-api.service';
import { environment } from '../../../../../environments/environment';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService],
  exports: [UserApiService],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class UserApiModule {}
