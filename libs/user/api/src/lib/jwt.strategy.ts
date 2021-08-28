import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { environment } from '../../../../../environments/environment';
import { JwtPayload, UserEntity } from '@esc/user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.jwtSecret,
    });
  }

  async validate({ user_id }: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findOne(user_id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
