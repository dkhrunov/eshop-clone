import { UserEntity } from '@esc/user/models';

export const isUser = (value: unknown): value is UserEntity => {
  return (value as UserEntity).name !== undefined;
};
