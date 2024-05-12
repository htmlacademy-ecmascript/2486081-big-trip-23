import {TYPES_POINTS} from '../const.js';
import {getRandomElement} from '../utils.js';

const mockPoints = [
  {
    id: '1',
    basePrice: 1100,
    dateFrom: '2019-03-19T14:00',
    dateTo: '2019-03-19T14:30',
    destination: '1',
    isFavorite: true,
    offers: [
      '1'
    ],
    type: getRandomElement(TYPES_POINTS),
  },
  {
    id: '2',
    basePrice: 1500,
    dateFrom: '2019-03-11T12:30',
    dateTo: '2019-03-11T19:30',
    destination: '2',
    isFavorite: true,
    offers: [
      '2'
    ],
    type: getRandomElement(TYPES_POINTS),
  },
  {
    id: '3',
    basePrice: 1700,
    dateFrom: '2019-03-10T10:00',
    dateTo: '2019-03-10T21:30',
    destination: '3',
    isFavorite: false,
    offers: [
      '3',
    ],
    type: getRandomElement(TYPES_POINTS),
  },
  {
    id: '4',
    basePrice: 2500,
    dateFrom: '2019-03-14T11:00',
    dateTo: '2019-03-14T23:30',
    destination: '4',
    isFavorite: false,
    offers: [
      '4'
    ],
    type: getRandomElement(TYPES_POINTS),
  }
];

function getRandomPoints() {
  return getRandomElement(mockPoints);
}

export {getRandomPoints};
