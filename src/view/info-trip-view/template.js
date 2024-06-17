import {getSumPricePoints, getSumPriceOffers} from '../info-trip-view/utils';
import dayjs from 'dayjs';

function createNameTripDestination(points, destinations) {
  const startTrip = destinations.find((destination) => destination.id === points[0].destination);
  const middleTrip = destinations.find((destination) => destination.id === points[Math.floor(points.length / 2)].destination);
  const endTrip = destinations.find((destination) => destination.id === points[points.length - 1].destination);

  if (points.length === 1) {
    return (`<h1 class="trip-info__title">${startTrip.name}</h1>`);
  } else if (points.length === 2) {
    return (`<h1 class="trip-info__title">${startTrip.name} &mdash; ${endTrip.name}</h1>`);
  } else if (points.length === 3) {
    return (`<h1 class="trip-info__title">${startTrip.name} &mdash; ${middleTrip.name} &mdash; ${endTrip.name}</h1>`);
  } else {
    return(`<h1 class="trip-info__title"> ${startTrip.name} &mdash; ... &mdash; ${endTrip.name}</h1>`);
  }
}

function createDateTrip(points) {
  const startTrip = dayjs(points[0].dateFrom).format('D MMM');
  const endTrip = dayjs(points[points.length - 1].dateTo).format('D MMM');
  return (`
    <p class="trip-info__dates">${startTrip}&nbsp;&mdash;&nbsp;${endTrip}</p>
    `);
}

function createTotalPrice(points, offers) {
  const total = getSumPricePoints(points) + getSumPriceOffers(points, offers);
  return (`
    <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span></p>
    `);
}

export function createInfoTripTemplate (points, offers, destinations) {
  return (`
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
      ${createNameTripDestination(points,destinations)}
      ${createDateTrip(points)}
      </div>
      ${createTotalPrice(points, offers)}
    </section>`);
}
