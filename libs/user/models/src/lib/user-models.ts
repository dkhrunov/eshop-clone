import { BeforeInsert, Column, Entity } from 'typeorm';
import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
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

  @Column({ length: 20, unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  street!: string;

  @Column({ nullable: true })
  apartment!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ length: 10, nullable: true })
  zip!: string;

  @Column({ length: 30, nullable: true })
  country!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ type: 'boolean', default: true })
  isAdmin!: boolean;

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

  @IsOptional()
  @IsMobilePhone()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsOptional()
  @IsString()
  apartment?: string;

  @IsOptional()
  @IsString()
  zip?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  street?: string;
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
  isAdmin?: boolean;

  @IsOptional()
  apartment?: string;

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
