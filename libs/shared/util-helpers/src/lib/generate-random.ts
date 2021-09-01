import { Chance as generateRandom } from 'chance';
import { sub } from 'date-fns';
import {
  CategoryEntity,
  CreateProductDto,
  ProductEntity,
} from '@esc/product/models';
import { OrderEntity, OrderItem, OrderItemEntity } from '@esc/order/models';

const categoriesMap = new Map([
  ['Computers', 'icon-computer'],
  ['Health', 'icon-hearth'],
  ['Electronics', 'icon-electronics'],
  ['Beauty', 'icon-beauty'],
]);

const newCategoryName = generateRandom().pickone([...categoriesMap.keys()]);

export const generateProduct = (): CreateProductDto => {
  return {
    name: generateRandom().name(),
    description: generateRandom().sentence(),
    rich_description: generateRandom().paragraph(),
    image: generateRandom().url(),
    brand: generateRandom().animal(),
    price: generateRandom().integer({ min: 1, max: 10_000 }),
    countInStock: generateRandom().integer({ min: 1, max: 254 }),
    rating: generateRandom().integer({ min: 0, max: 10 }),
    num_reviews: generateRandom().integer({ min: 0, max: 1000 }),
    is_featured: generateRandom().bool(),
  };
};

export const generateNonExistentUUID = (): string => {
  return generateRandom().guid();
};

export const generateCategory = () => {
  return {
    name: newCategoryName,
    image: `https://source.unsplash.com/random/400x300?v=${generateRandom().integer()}`,
    color: generateRandom().color({ format: 'hex' }),
    icon: categoriesMap.get(newCategoryName) as string,
  };
};

export const generateCard = () => {
  return {
    cover: `https://source.unsplash.com/random/400x300?v=${generateRandom().integer()}`,
    title: generateRandom().sentence(),
    channelName: generateRandom().name(),
    channelVerified: generateRandom().bool(),
    views: generateRandom().integer({ min: 0, max: 3_000_000 }),
    published: generateRandom().date({
      max: new Date(),
      min: sub(new Date(), { years: 3 }),
    }) as Date,
    durationInSeconds: generateRandom().integer({ min: 0, max: 9000 }),
    avatar: `https://source.unsplash.com/100x100?portrait&v=${generateRandom().integer()}`,
  };
};

export const generateUser = () => {
  return {
    name: generateRandom().name(),
    email: generateRandom().email(),
    password: generateRandom().string(),
    street: generateRandom().street(),
    apartment: generateRandom().integer({ min: 1, max: 50 }),
    city: generateRandom().city(),
    zip: generateRandom().zip(),
    country: generateRandom().country(),
    phone: generateRandom().phone({ mobile: true }),
    is_admin: true,
  };
};

export const generateOrder = (orderItems: OrderItem[]) => {
  return {
    orderItems,
    shippingAddressOne: generateRandom().address(),
    shippingAddressTwo: generateRandom().address(),
    city: generateRandom().city(),
    zip: generateRandom().zip(),
    country: generateRandom().country(),
    phone: generateRandom().phone({ mobile: true }),
  };
};

export const generateOrderItems = (products: ProductEntity[]): OrderItem[] => {
  const orderItem = new Map();

  for (const product of products) {
    orderItem.set(product.id, generateRandom().integer({ min: 1, max: 10 }));
  }

  return Array.from(orderItem).map(([product, quantity]) => ({
    product,
    quantity,
  }));
};

export const pickRandomCategories = (categories: CategoryEntity[]) => {
  const allCategoriesMap = new Map<string, string>();

  generateRandom()
    .pickset<CategoryEntity>(
      categories,
      generateRandom().integer({
        min: 1,
        max: 3,
      })
    )
    .forEach(({ id, name }: CategoryEntity) => {
      allCategoriesMap.set(id, name);
    });

  const allCategoriesNames = [...allCategoriesMap.values()].join(',');

  return { allCategoriesMap, allCategoriesNames };
};
