import dayjs from 'dayjs';

function sortingByDay(pointA, pointB) {
  const dateA = dayjs(pointA.dateFrom);
  const dateB = dayjs(pointB.dateFrom);
  return dateA - dateB;
}
function sortingByTime(pointA, pointB) {
  const diffPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'hours', true);
  const diffPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'hours', true);
  return diffPointB - diffPointA;
}

function sortingByPrice(pointA, pointB) {
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

export {sortingByDay, sortingByTime, sortingByPrice, isChecked, isDisabled};

