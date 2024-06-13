const TYPES_POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const AUTHORIZATION = 'Basic davaiRabotaiServer';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';
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
  MAJOR: 'MAJOR',
  INIT: 'INIT'
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

const MessagesFilters = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT:  'There are no present events now',
  PAST:  'There are no past events now'
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

const defaultPoints = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const TimeLimit = {
  LOWER_LIMIT:350,
  UPPER_LIMIT:10
};

export {TYPES_POINTS,TYPES_SORT, END_POINT, AUTHORIZATION, Mode, UserAction, UpdateType, SortingType, FilterType, MessagesFilters, Method,defaultPoints, TimeLimit};
