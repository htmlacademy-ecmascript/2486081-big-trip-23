import {TYPES_POINTS} from '../const.js';
import {getRandomElement} from '../utils.js';

export const mockPoints = [
  {
    id: '1',
    basePrice: Math.floor(Math.random() * 200),
    dateFrom: `2019-03-19T14:${Math.floor(Math.random() * 40)}`,
    dateTo: '2019-03-19T14:50',
    destination: '1',
    isFavorite: Math.random() < 0.5,
    offers: [
      '1'
    ],
    type: getRandomElement(TYPES_POINTS),
  },
  {
    id: '2',
    basePrice: Math.floor(Math.random() * 200),
    dateFrom: '2019-03-11T00:10',
    dateTo: `2019-03-11T${Math.floor(Math.random() * 23)}:50`,
    destination: '2',
    isFavorite: Math.random() < 0.5,
    offers: [
      '2'
    ],
    type: getRandomElement(TYPES_POINTS),
  },
  {
    id: '3',
    basePrice: Math.floor(Math.random() * 200),
    dateFrom: `2019-03-10T${Math.floor(Math.random() * 22)}:00`,
    dateTo: `2019-03-10T23:${Math.floor(Math.random() * 59)}`,
    destination: '3',
    isFavorite: Math.random() < 0.5,
    offers: [
      '3',
    ],
    type: getRandomElement(TYPES_POINTS),
  },
];
