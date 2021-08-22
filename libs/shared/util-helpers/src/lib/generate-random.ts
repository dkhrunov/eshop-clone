import { Chance as generateRandom } from 'chance';
import { CreateProductDto } from '@esc/product/entities';

export const generateProduct = (): CreateProductDto => {
  return {
    name: generateRandom().name(),
    image: generateRandom().url(),
    countInStock: generateRandom().integer({ min: 0, max: 10000 }),
  };
};
