import dayjs from 'dayjs';

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function differenceTime(end, start) {
  const diff = dayjs(end).diff(dayjs(start), 'hours', true);
  const hours = Math.floor(diff);
  const min = Math.floor((diff - hours) * 60);

  if (hours === 0) {
    return `${min}M`;
  }

  return `${hours}H ${min}M`;
}

function getDateEvent(date, format) {
  return dayjs(date).format(format);
}

export {getRandomElement, differenceTime, getDateEvent};
