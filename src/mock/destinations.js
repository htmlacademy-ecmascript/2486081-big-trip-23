import {DESTINATION, DESCRIPTION} from '../const.js';
import {getRandomElement} from '../utils.js';

export const mockDestinations = [
  {
    id: '1',
    description: getRandomElement(DESCRIPTION),
    name: getRandomElement(DESTINATION),
    pictures: [{
      src: 'https://loremflickr.com/248/152?random=11',
      description: 'description photo11'
    }]
  },
  {
    id: '2',
    description: getRandomElement(DESCRIPTION),
    name: getRandomElement(DESTINATION),
    pictures: [{
      src: 'https://loremflickr.com/248/152?random=22',
      description: 'description photo22'
    }]
  },
  {
    id: '3',
    description: getRandomElement(DESCRIPTION),
    name: getRandomElement(DESTINATION),
    pictures: [{
      src: 'https://loremflickr.com/248/152?random=33',
      description: 'description photo33'
    }]
  },
  {
    id: '4',
    description: getRandomElement(DESCRIPTION),
    name: getRandomElement(DESTINATION),
    pictures: [{
      src: 'https://loremflickr.com/248/152?random=29',
      description: 'description photo29'
    }]
  }
];


