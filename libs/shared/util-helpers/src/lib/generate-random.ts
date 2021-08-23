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
    cover: `https://source.unsplash.com/random/800x600?v=${generateRandom().integer()}`,
    title: `${generateRandom().sentence().substring(0, 40)}...`,
    channelName: generateRandom().name(),
    views: generateRandom().integer({ min: 0, max: 100000 }),
    published: generateRandom().date({
      max: new Date(),
      min: sub(new Date(), { years: 3 }),
    }) as Date,
    durationInSeconds: generateRandom().integer({ min: 0, max: 9000 }),
    avatar: generateRandom().avatar({ protocol: 'http' }),
  };
};
