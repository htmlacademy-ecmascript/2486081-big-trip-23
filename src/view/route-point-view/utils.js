import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

function differenceTime(end, start) {
  const diffDay = dayjs(end).diff(dayjs(start), 'days');
  const day = dayjs.duration({day: diffDay}).format('DD[d]');
  const hours = dayjs.duration(dayjs(end).diff(dayjs(start))).format('HH[h]');
  const minute = dayjs.duration(dayjs(end).diff(dayjs(start))).format('mm[m]');


  if(day === '0d') {
    return `${hours} ${minute}`;
  }

  if (hours === '00h' && day === '00d') {
    return `${minute}`;
  }


  return `${day} ${hours} ${minute}`;
}

export {differenceTime};
