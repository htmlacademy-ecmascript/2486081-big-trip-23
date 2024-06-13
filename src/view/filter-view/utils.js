import dayjs from 'dayjs';
import { FilterType } from '../../const';
const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]:(points) => points.filter((point) => dayjs(point.dateFrom).diff(new Date(), 'day') >= 1),
  [FilterType.PRESENT]:(points) => points.filter((point) => dayjs(point.dateFrom) <= dayjs(new Date()) && dayjs(point.dateTo) >= dayjs(new Date())),
  [FilterType.PAST]:(points) => points.filter((point) => dayjs(point.dateTo).diff(new Date(), 'day') < 0)
};
export {filter};
