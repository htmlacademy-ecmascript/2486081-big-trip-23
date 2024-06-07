import dayjs from 'dayjs';
function sortingByDay(pointA, pointB) {
  const dateA = dayjs(pointA.dateFrom);
  const dateB = dayjs(pointB.dateFrom);
  return dateB - dateA;
}
function sortingByTime(pointA, pointB) {
  const diffPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom), 'hours', true);
  const diffPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom), 'hours', true);
  return diffPointB - diffPointA;
}

function sortingByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

const disabled = (type) => {
  if(type === 'event' || type === 'offers') {
    return 'disabled';
  }
  return '';
};
export {sortingByDay, sortingByTime, sortingByPrice, disabled};

