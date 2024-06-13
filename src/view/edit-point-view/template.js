import {TYPES_POINTS} from '../../const';
import {adaptToLowerCase, getIdOffer} from '../edit-point-view/utils';
import dayjs from 'dayjs';
import he from 'he';

function createEventType(type) {
  return (`
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    `);
}

function createTypePoint(type) {
  return (`
    <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${TYPES_POINTS.map((pointType) => (`<div class="event__type-item">
    <input id="event-type-${adaptToLowerCase(pointType)}-${getIdOffer(TYPES_POINTS, pointType)}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${adaptToLowerCase(pointType)}" ${adaptToLowerCase(pointType) === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${adaptToLowerCase(pointType)}" for="event-type-${adaptToLowerCase(pointType)}-${getIdOffer(TYPES_POINTS, pointType)}">${pointType}</label>
    </div>`)).join(' ')}
    `);
}

function createEventFieldGroup(type, currentDestination) {
  return (`
    <label class="event__label  event__type-output" for="event-destination-1">
    ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(currentDestination !== undefined ? currentDestination.name : '')}" list="destination-list-1">
    `);
}
function createDatalistDestination(destinations) {
  return (`
    <datalist id="destination-list-1">
    ${destinations.map((destination) =>`
    <option value="${destination.name}"></option>
    `).join(' ')}
    </datalist>
    `);
}

function createDateEvent(dateFrom, dateTo) {
  return (`
    <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom !== '' ? dayjs(dateFrom).format('YY/MM/DD HH:mm') : ''}">
      &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo !== '' ? dayjs(dateTo).format('YY/MM/DD HH:mm') : ''}">
    </div>
    `);
}

function createPrice(basePrice) {
  return (`
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode((basePrice.toString()))}">
    `);
}

function createButton (point) {
  if (!point.id) {
    return (`
    <button class="event__save-btn  btn  btn--blue" type="submit" ${point.isDisabled ? 'disabled' : ''}>${point.isSaving ? 'Saving...' : 'Save'}</button>
    <button class="event__reset-btn" type="reset">Cancel</button>
    `);
  } else {
    return (`
      <button class="event__save-btn  btn  btn--blue" type="submit" ${point.isDisabled ? 'disabled' : ''}>${point.isSaving ? 'Saving...' : 'Save'}</button>
      <button class="event__reset-btn" type="reset" ${point.isDisabled ? 'disabled' : ''}>${point.isDeleting ? 'Deleting...' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
      </button>
      `);
  }
}

function createOffers(offersType, point) {
  if (offersType.length !== 0) {
    return (`
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
      ${offersType.map((offer) => (`
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${offersType.indexOf(offer) + 1}" type="checkbox" name="event-offer-luggage" data-offer-id=${offer.id} ${point.offers.includes(offer.id) ? 'checked' : ' '}>
      <label class="event__offer-label" for="event-offer-luggage-${offersType.indexOf(offer) + 1}">
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </label>
      </div>`)).join('')}
      </div>
      </section>
    `);
  } else {
    return '';
  }
}

function createDestination(currentDestination) {
  if (currentDestination && currentDestination.description !== '') {
    return (`
      <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${currentDestination.description}</p>
      </section>
  `);
  } else {
    return '';
  }
}

function createPhoto(currentDestination) {
  if (currentDestination && currentDestination.pictures.length !== 0) {
    return (
      `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${currentDestination.pictures.map((picture) =>`
      <img class="event__photo" src="${picture.src}" alt="${picture.description}">`
      ).join('')}
      </div>
      </div>
    `);
  } else {
    return '';
  }
}

export function createEditPointTemplate(point, offers, destinations) {

  const {type, basePrice, dateFrom, dateTo} = point;
  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  const offersType = offers.find((offer) => offer.type === point.type).offers;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
        ${createEventType(type)}
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
          ${createTypePoint(type)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          ${createEventFieldGroup(type, currentDestination)}
          ${createDatalistDestination(destinations)}
        </div>
        ${createDateEvent(dateFrom, dateTo)}
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          ${createPrice(basePrice)}
        </div>
        ${createButton(point)}
      </header>
      <section class="event__details">
        ${createOffers(offersType, point)}
        ${createDestination(currentDestination)}
        ${createPhoto(currentDestination)}
      </section>
      </form>
      </li>`
  );
}
