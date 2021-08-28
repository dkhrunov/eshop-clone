import {
  RegisterUserDto,
  UserResponse,
  UserEntity,
  UpdateUserDto,
  LoginUserDto,
  LoginResponse,
  JwtPayload,
} from '@esc/user/entities';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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
      throw new ConflictException('User already exist');
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
      select: ['password', 'id', 'email'],
    });

    if (!user || !(await this.isPasswordValid(password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload: JwtPayload = { user_id: user.id };

    const token = this.jwtService.sign(payload);

    return {
      user: user.email,
      token,
    };
  }

  private async isPasswordValid(
    password: string,
    hash: string
  ): Promise<boolean> {
    return compare(password, hash);
  }
}
