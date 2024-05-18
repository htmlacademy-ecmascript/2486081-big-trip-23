import AbstractView from '../../framework/view/abstract-view';
import {createEditPointTemplate} from './template';

export default class EditPointView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;
  #onFormSubmit = null;

  constructor(points, offers, destinations, {onFormSubmit}) {
    super();
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createEditPointTemplate(this.#points, this.#offers, this.#destinations);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit();
  };
}
