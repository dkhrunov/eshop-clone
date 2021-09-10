import { CoreEntity } from '..';

export const isEntity = (value: unknown): value is CoreEntity => {
  return (value as CoreEntity).id !== undefined;
};
