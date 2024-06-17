import dayjs from 'dayjs';

function sortByDays(pointA, pointB) {
  const dateA = dayjs(pointA.dateFrom);
  const dateB = dayjs(pointB.dateFrom);
  return dateA - dateB;
}
function sortByTime(pointA, pointB) {
  const diffPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'hours', true);
  const diffPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'hours', true);
  return diffPointB - diffPointA;
}

function sortByPrices(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function isChecked(currentSort, type) {
  return currentSort === `sort-${type}` ? 'checked' : '';
}

function isDisabled(type) {
  if(type === 'event' || type === 'offers') {
    return 'disabled';
  }
  return '';
}

export {sortByDays, sortByTime, sortByPrices, isChecked, isDisabled};

