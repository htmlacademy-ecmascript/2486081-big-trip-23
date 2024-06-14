import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function differenceTime(end, start) {
  const diffDay = dayjs(end).diff(dayjs(start), 'days');
  const day = dayjs.duration({day: diffDay}).format('DD[d]');
  const hours = dayjs.duration(dayjs(end).diff(dayjs(start))).format('HH[h]');
  const minute = dayjs.duration(dayjs(end).diff(dayjs(start))).format('mm[m]');

  if(day === 0) {
    return `${hours} ${minute}`;
  }
  if (hours === 0 && day === 0) {
    return `${minute}`;
  }

  return `${day} ${hours} ${minute}`;
}

export {differenceTime};
