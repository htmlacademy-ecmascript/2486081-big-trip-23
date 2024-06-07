const TYPES_POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const TYPES_SORT = ['day', 'event', 'time', 'price', 'offers'];

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const UserAction = {
  UPDATE_DATA: 'UPDATE_DATA',
  ADD_DATA: 'ADD_DATA',
  DELETE_DATA: 'DELETE_DATA'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const SortingType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

const FilterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PRESENT: 'PRESENT',
  PAST: 'PAST'
};

const MessagaFilters = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT:  'There are no present events now',
  PAST:  'There are no past events now'
};

const defaultPoints = {
  id: '0',
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(Date.now() + 9999999),
  destination: '',
  isFavorite: false,
  offers: [ ],
  type: 'bus'
};
export {TYPES_POINTS,TYPES_SORT, Mode, UserAction, UpdateType, SortingType, FilterType, MessagaFilters, defaultPoints};
