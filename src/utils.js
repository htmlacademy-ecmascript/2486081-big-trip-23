import dayjs from 'dayjs';

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function differenceTime(end, start) {
  const diff = dayjs(end).diff(dayjs(start), 'hours', true);
  const hour = Math.floor(diff);
  const min = Math.floor((diff - hour) * 60);
  if (hour === 0) {
    return `${min}M`;
  }

  return `${hour}H ${min}M`;
}

function getDateEvent(date, format) {
  return dayjs(date).format(format);
}

export {getRandomElement, differenceTime, getDateEvent};
