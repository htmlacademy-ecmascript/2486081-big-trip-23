export const MOCK_POINTS = [
  {
    id: '1',
    basePrice: 450,
    dateFrom: `2019-03-19T14:${Math.floor(Math.random() * 40)}`,
    dateTo: '2019-03-19T14:50',
    destination: 'c075c5b',
    isFavorite: Math.random() < 0.5,
    offers: [
      '2569b95',
      'af5d844'
    ],
    type: 'taxi',
  },
  {
    id: '2',
    basePrice: 250,
    dateFrom: `2019-04-10T${Math.floor(Math.random() * 22)}:10`,
    dateTo: '2019-04-10T23:00',
    destination: '6d2d75d',
    isFavorite: Math.random() < 0.5,
    offers: [
      'f14f05d',
      '293bc6b',
      '792cd5f'
    ],
    type: 'bus',
  },
  {
    id: '3',
    basePrice: 690,
    dateFrom: `2019-05-17T${Math.floor(Math.random() * 20)}:${Math.floor(Math.random() * 50)}`,
    dateTo: '2019-05-17T23:55',
    destination: '5bd16fd',
    isFavorite: Math.random() < 0.5,
    offers: [
      '3322c52',
      'c551118',
      '5163da3',
      'd524497',
      '053bcd0',
    ],
    type: 'train',
  },
  {
    id: '4',
    basePrice: 1200,
    dateFrom: '2019-09-15T12:00',
    dateTo: `2019-09-20T21:${Math.floor(Math.random() * 50)}`,
    destination: 'dade949',
    isFavorite: Math.random() < 0.5,
    offers: [
      'e244371',
      '12cb95f',
      '8d4ed52',
      '1ffaccd',
    ],
    type: 'ship',
  },
  {
    id: '5',
    basePrice: 400,
    dateFrom: `2019-01-11T${Math.floor(Math.random() * 12)}:10`,
    dateTo: '2019-01-11T12:50',
    destination: 'ba302ad',
    isFavorite: Math.random() < 0.5,
    offers: [
      '9f0e36a',
      '40793ee'
    ],
    type: 'drive'
  },
  {
    id: '6',
    basePrice: 675,
    dateFrom: '2019-12-19T06:00',
    dateTo: `2019-12-19T09:${Math.floor(Math.random() * 30)}`,
    destination: 'af7b282',
    isFavorite: Math.random() < 0.5,
    offers: [
      'ac5d23b',
      '546f8ad',
      'b0b3aeb',
    ],
    type: 'flight'
  },
  {
    id: '7',
    basePrice: 100,
    dateFrom: `2019-10-14T0${Math.floor(Math.random() * 3)}:35`,
    dateTo: '2019-10-14T04:45',
    destination: '2a83d81',
    isFavorite: Math.random() < 0.5,
    offers: [
      '1'
    ],
    type: 'check-in'
  },
  {
    id: '8',
    basePrice: 90,
    dateFrom: '2019-08-12T09:45',
    dateTo: `2019-08-12T18:${Math.floor(Math.random() * 59)}`,
    destination: '3b90293',
    isFavorite: Math.random() < 0.5,
    offers: [
      '7858dc0',
      '7db9aec',
      '73d1c07'
    ],
    type: 'sightseeing'
  },
  {
    id: '9',
    basePrice: 70,
    dateFrom: '2019-11-18T14:30',
    dateTo: `2019-11-18T16:${Math.floor(Math.random() * 59)}`,
    destination: '5968b44',
    isFavorite: Math.random() < 0.5,
    offers: [
      'd1a1d57'
    ],
    type: 'restaurant',
  }
];
