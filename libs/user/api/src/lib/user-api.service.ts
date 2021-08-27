import {
  RegisterUserDto,
  RegisterUserResponse,
  UserEntity,
} from '@esc/user/entities';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<RegisterUserResponse> {
    const isUserExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (isUserExist) {
      throw new ConflictException('User already exist');
    }

    const newUser = this.userRepository.create(dto);

    try {
      const { password, ...user } = await this.userRepository.save(newUser);

      return {
        registered_user: {
          ...user,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async listUsers(): Promise<UserEntity[]> {
    const users = await this.userRepository.find();

    return users;
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
