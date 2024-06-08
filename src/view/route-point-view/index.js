import AbstractView from '../../framework/view/abstract-view';
import {createRoutePointView} from './template';

export default class RoutePointView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor({points, offers, destinations, onEditClick, onFavoriteClick}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createRoutePointView(this.#points, this.#offers, this.#destinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#onEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick();
  };
}
