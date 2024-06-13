import {createInfoTripTemplate} from './template';
import AbstractView from '../../framework/view/abstract-view';

export default class InfoTripView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor({point,offers, destinations,}) {
    super();
    this.#points = point;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    return createInfoTripTemplate(this.#points, this.#offers, this.#destinations);
  }
}
