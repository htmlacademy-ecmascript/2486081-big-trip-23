import {createElement} from '../render';

function createDestionationEditPointTemplate(destinations) {
  return (`
  <section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">${destinations.map(({description}) => description).join(' ')}</p>
  </section>
  </section>
  `);
}

export default class DestionationEditPointTemplate {
  constructor(destinations) {
    this.destinations = destinations;
  }

  getTemplate() {
    return createDestionationEditPointTemplate(this.destinations);
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
