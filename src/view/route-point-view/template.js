import {differenceTime} from '../route-point-view/utils';
import dayjs from 'dayjs';
import he from 'he';

function createEventDate(dateFrom) {
  return (`
  <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('D MMM')}</time>
    `);
}

function createEventType(type) {
  return (`
    <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon"></img>
    `);
}

function createEventTitle(type, currentDestination) {
  return (`
    <h3 class="event__title">${type} ${he.encode(currentDestination !== undefined ? currentDestination.name : '')}</h3>
    `);
}

function createSchedule(dateFrom, dateTo) {
  return (`
    <div class="event__schedule">
    <p class="event__time">
    <time class="event__start-time" datetime="${dateFrom}">${dayjs(dateFrom).format('HH:mm')}</time>
    &mdash;
    <time class="event__end-time" datetime="${dateTo}">${dayjs(dateTo).format('HH:mm')}</time>
    </p>
    <p class="event__duration">${differenceTime(dateTo, dateFrom)}</p>
    </div>
    `);
}

function createPrice(basePrice) {
  return (`
    &euro;&nbsp;<span class="event__price-value">${he.encode(basePrice.toString())}</span>
    `);
}

function createOffers(offers) {
  return (`
    ${offers.map((offer) => (`
    <li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
    </li>`
    )).join('')}
    `);
}

function createButtonFavorite(isFavorite) {
  return (`
    <button class="event__favorite-btn${isFavorite ? ' event__favorite-btn--active' : ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
    </button>
    `);
}

export function createRoutePointView(point, offers, destinations) {

  const {type, isFavorite, basePrice, dateFrom, dateTo} = point;
  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  const typeOffers = offers.find((offer) => offer.type === point.type).offers;
  const selectedOffers = typeOffers.filter((offerType) => point.offers.includes(offerType.id));

  return (
    `<li class="trip-events__item">
      <div class="event">
        ${createEventDate(dateFrom)}
        <div class="event__type">
        ${createEventType(type)}
        </div>
        ${createEventTitle(type, currentDestination)}
        ${createSchedule(dateFrom, dateTo)}
        <p class="event__price">
        ${createPrice(basePrice)}
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${createOffers(selectedOffers)}
        </ul>
        ${createButtonFavorite(isFavorite)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}
