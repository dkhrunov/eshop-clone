import { BeforeInsert, Column, Entity } from 'typeorm';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { hash } from 'bcrypt';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { CoreEntity } from '@esc/shared/util-models';

@Entity('user')
export class UserEntity extends CoreEntity {
  @Column({ length: 40 })
  name!: string;

  @Column({ length: 20 })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  street!: string;

  @Column({ nullable: true })
  apartment!: number;

  @Column({ nullable: true })
  city!: string;

  @Column({ length: 10, nullable: true })
  zip!: string;

  @Column({ length: 15, nullable: true })
  country!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ type: 'boolean', default: false })
  is_admin!: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsMobilePhone()
  phone!: string;

  @IsBoolean()
  is_admin!: boolean;

  @IsNumber()
  apartment!: number;

  @IsString()
  zip!: string;

  @IsString()
  city!: string;

  @IsString()
  country!: string;
}
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsMobilePhone()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  is_admin?: boolean;

  @IsOptional()
  @IsNumber()
  apartment?: number;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}

export interface UserResponse {
  user: UserFromServer;
}

export type UserFromServer = Omit<UserEntity, 'password' | 'hashPassword'>;
export interface LoginResponse {
  user: string;
  token: string;
}

export interface JwtUserPayload extends JwtPayload {
  userId: string;
  isAdmin: boolean;
}

export interface RequestWithUser extends Request {
  user: UserEntity | null;
}
