import { Chance as generateRandom } from 'chance';
import { sub } from 'date-fns';

export const generateProduct = () => {
  return {
    name: generateRandom().name(),
    image: generateRandom().url(),
    countInStock: generateRandom().integer({ min: 0, max: 10000 }),
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
