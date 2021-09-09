import { UserEntity } from '@esc/user/models';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApiController } from './user-api.controller';
import { UserApiService } from './user-api.service';
import { environment } from '@env/environment';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService],
  exports: [UserApiService, JwtModule],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class UserApiModule {}
