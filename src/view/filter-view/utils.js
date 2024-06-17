import dayjs from 'dayjs';
import {FilteringType} from '../../const';

const Filter = {
  [FilteringType.EVERYTHING]: (points) => points,
  [FilteringType.FUTURE]:(points) => points.filter((point) => dayjs(point.dateFrom).diff(new Date(), 'day') >= 1),
  [FilteringType.PRESENT]:(points) => points.filter((point) => dayjs(point.dateFrom) <= dayjs(new Date()) && dayjs(point.dateTo) >= dayjs(new Date())),
  [FilteringType.PAST]:(points) => points.filter((point) => dayjs(point.dateTo).diff(new Date(), 'day') < 0)
};

export {Filter};
