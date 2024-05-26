import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import {createEditPointTemplate} from './template';

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;

  #onFormSubmit = null;

  constructor({points, offers, destinations, onFormSubmit}) {
    super();
    this._setState(EditPointView.parsePointToState(points));
    this.#offers = offers;
    this.#destinations = destinations;

    this.#onFormSubmit = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState(points) {
    return {...points};
  }

  static parseStateToPoint(state) {
    const points = {...state};
    return points;
  }

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: this.#destinations.find(({name}) => name === evt.target.value).id
    });
  };
}
