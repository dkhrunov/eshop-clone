import { CategoryEntity } from '@esc/product/models';
import { CoreEntity } from '@esc/shared/util-models';
import { compareDesc } from 'date-fns';

export const sortByNameFn = (
  left: CategoryEntity,
  right: CategoryEntity
): number => {
  return left.name.localeCompare(right.name);
};

export const sortByDateFn = (left: CoreEntity, right: CoreEntity): number => {
  const leftDate = new Date(left.dateCreated);
  const rightDate = new Date(right.dateCreated);

  return compareDesc(leftDate, rightDate);
};
