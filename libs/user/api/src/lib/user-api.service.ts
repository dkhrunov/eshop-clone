import {
  RegisterUserDto,
  UserResponse,
  UserEntity,
  UpdateUserDto,
  LoginUserDto,
  LoginResponse,
  JwtUserPayload,
} from '@esc/user/models';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CountResponse, ErrorMessages } from '@esc/shared/util-models';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService
  ) {}

  async registerUser(dto: RegisterUserDto): Promise<UserResponse> {
    const isUserExist = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (isUserExist) {
      throw new ConflictException(ErrorMessages.USER_ALREADY_EXIST);
    }

    const newUser = this.userRepository.create(dto);

    try {
      const { password, ...user } = await this.userRepository.save(newUser);

      return {
        user: {
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

  async updateUser(
    id: string,
    dto: UpdateUserDto
  ): Promise<UserResponse | UpdateResult> {
    const isUserExist = await this.userRepository.findOne(id, {
      select: ['password'],
    });

    let newPassword;

    if (dto.password) {
      newPassword = await hash(dto.password, 10);
    } else {
      newPassword = isUserExist?.password;
    }

    const result = await this.userRepository.update(id, {
      ...dto,
      password: newPassword,
    });

    if (result.affected) {
      const updatedUser = (await this.userRepository.findOne(id)) as UserEntity;
      return {
        user: {
          ...updatedUser,
        },
      };
    } else {
      return result;
    }
  }

  async loginUser(dto: LoginUserDto): Promise<LoginResponse> {
    const { email, password } = dto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['password', 'id', 'email', 'is_admin'],
    });

    if (!user || !(await this.isPasswordValid(password, user.password))) {
      throw new BadRequestException(ErrorMessages.INVALID_CREDENTIALS);
    }

    const payload: JwtUserPayload = { userId: user.id, isAdmin: user.is_admin };

    const token = this.jwtService.sign(payload);

    return {
      user: user.email,
      token,
    };
  }

  async getUserCount(): Promise<CountResponse> {
    const [, user_count] = await this.userRepository.findAndCount();
    return { user_count };
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    const result = await this.userRepository.delete(id);

    if (!result) {
      throw new InternalServerErrorException();
    }

    return result;
  }

  private async isPasswordValid(
    password: string,
    hash: string
  ): Promise<boolean> {
    return compare(password, hash);
  }
}
