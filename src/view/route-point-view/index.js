import AbstractView from '../../framework/view/abstract-view';
import {createRoutePointView} from './template';

export default class RoutePointView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #onOpenEventClick = null;

  constructor(point, offers, destinations, {onButtonClick}) {
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onOpenEventClick = onButtonClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#openEventClickHandler);
  }

  get template() {
    return createRoutePointView(this.#point, this.#offers, this.#destinations);
  }

  #openEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#onOpenEventClick();
  };
}
