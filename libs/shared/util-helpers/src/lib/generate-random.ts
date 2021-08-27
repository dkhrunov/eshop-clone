import { Chance as generateRandom } from 'chance';
import { sub } from 'date-fns';

const categoriesMap = new Map([
  ['Computers', 'icon-computer'],
  ['Health', 'icon-hearth'],
  ['Electronics', 'icon-electronics'],
  ['Beauty', 'icon-beauty'],
]);

const newCategoryName = generateRandom().pickone([...categoriesMap.keys()]);

export const generateProduct = () => {
  return {
    name: generateRandom().name(),
    description: generateRandom().sentence(),
    rich_description: generateRandom().paragraph(),
    image: generateRandom().url(),
    brand: generateRandom().animal(),
    price: generateRandom().integer({ min: 1, max: 10_000 }),
    count_in_stock: generateRandom().integer({ min: 1, max: 254 }),
    rating: generateRandom().integer({ min: 0, max: 10 }),
    num_reviews: generateRandom().integer({ min: 0, max: 1000 }),
    is_featured: generateRandom().bool(),
  };
};

export const generateNonExistentCategoryId = (): string => {
  return generateRandom().guid();
};

export const generateNonExistentProductId = (): string => {
  return generateRandom().guid();
};

export const generateCategory = () => {
  return {
    name: newCategoryName,
    image: `https://source.unsplash.com/random/400x300?v=${generateRandom().integer()}`,
    color: generateRandom().color({ format: 'hex' }),
    icon: categoriesMap.get(newCategoryName),
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
