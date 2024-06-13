import dayjs from 'dayjs';

function differenceTime(end, start) {
  const diff = dayjs(end).diff(dayjs(start), 'days', true);
  const day = Math.floor(diff);
  const hours = Math.floor((diff - day) * 24);
  const min = Math.round((((diff - day) * 24) - hours) * 60);
  if (hours === 0 && day === 0) {
    return `${min}M`;
  }
  if(day === 0) {
    return `${hours}H ${min}M`;
  }
  return `${day}D ${hours}H ${min}M`;
}

export {differenceTime};
