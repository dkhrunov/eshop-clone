import { JwtUserPayload, RequestWithUser, UserEntity } from '@esc/user/models';
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async use(req: RequestWithUser, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      throw new UnauthorizedException();
    }

    try {
      const [, token] = req.headers['authorization'].split(' ');
      const decodedToken: JwtUserPayload = this.jwtService.verify(token);
      const user = await this.userRepository.findOne(decodedToken.userId);

      if (user && user.is_admin) {
        req.user = user;

        next();
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
