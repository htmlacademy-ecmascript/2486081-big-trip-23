import {TYPES_POINTS, OFFERS} from '../const.js';
import {getRandomElement} from '../utils.js';

export const mockOffers = [
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '1',
      title: getRandomElement(OFFERS),
      price: Math.floor(Math.random() * 200)
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '2',
      title: getRandomElement(OFFERS),
      price: Math.floor(Math.random() * 200)
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '3',
      title: getRandomElement(OFFERS),
      price: Math.floor(Math.random() * 200),
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '4',
      title: getRandomElement(OFFERS),
      price: Math.floor(Math.random() * 200),
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '5',
      title: getRandomElement(OFFERS),
      price: Math.floor(Math.random() * 200),
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '6',
      title: getRandomElement(OFFERS),
      price: Math.floor(Math.random() * 200),
    }]
  },
  {
    type: getRandomElement(TYPES_POINTS),
    'offers': [{
      id: '7',
      title: getRandomElement(OFFERS),
      price: Math.floor(Math.random() * 200),
    }]
  }
];
