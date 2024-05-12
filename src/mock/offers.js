import {TYPES_POINTS, OFFERS} from '../const.js';
import {getRandomElement} from '../utils.js';

const mockOffers = [
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '1',
      title: getRandomElement(OFFERS),
      price: 200
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '2',
      title: getRandomElement(OFFERS),
      price: 130
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '3',
      title: getRandomElement(OFFERS),
      price: 40,
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '4',
      title: getRandomElement(OFFERS),
      price: 452,
    }]
  }
];

function getRandomOffers() {
  return getRandomElement(mockOffers);
}

export {getRandomOffers};
