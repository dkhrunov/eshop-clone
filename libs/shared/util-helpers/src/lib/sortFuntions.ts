import { CategoryEntity, ProductEntity } from '@esc/product/models';
import { compareDesc } from 'date-fns';

export const sortByNameFn = (
  left: CategoryEntity,
  right: CategoryEntity
): number => {
  return left.name.localeCompare(right.name);
};

export const sortByDateFn = (
  left: ProductEntity,
  right: ProductEntity
): number => {
  const leftDate = new Date(left.dateCreated);
  const rightDate = new Date(right.dateCreated);

  return compareDesc(leftDate, rightDate);
};
