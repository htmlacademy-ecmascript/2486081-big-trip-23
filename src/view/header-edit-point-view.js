import {createElement} from '../render';
import {TYPES_POINTS, DESTINATION} from '../const.js';
import {getDateEvent} from '../utils.js';

function createHeaderEditPointTemplate(point, destinations) {

  const {id, type, basePrice, dateFrom, dateTo} = point;
  const startEvent = getDateEvent(dateFrom, 'YY/MM/DD HH:mm');
  const endEvent = getDateEvent(dateTo,'YY/MM/DD HH:mm');
  const currentDestination = destinations.find((destination) => destination.id === point.destination);

  return (`
  <header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>

      ${TYPES_POINTS.map((pointType) => (
      `<div class="event__type-item">
        <input id="event-type-${pointType}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" ${pointType === type ? 'checked' : ' '}>
        <label class="event__type-label  event__type-label--${pointType}" for="event-${pointType}-${pointType}-${id}">${pointType}</label>
      </div> `
    )).join(' ')}
    </fieldset>
  </div>
</div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${DESTINATION.map((destination) =>
      `<option value="${destination}"></option>`
    ).join(' ')}
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startEvent}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endEvent}">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
  `);
}

export default class HeaderEditPointTemplate {
  constructor(points,destinations) {
    this.points = points;
    this.destinations = destinations;
  }

  getTemplate() {
    return createHeaderEditPointTemplate(this.points,this.destinations);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
