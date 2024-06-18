import {defaultPoint} from '../../const';
import {createEditPointTemplate} from './template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EditPointView extends AbstractStatefulView {
  #offers = null;
  #destinations = null;
  #datepicker = null;
  #onFormSubmit = null;
  #onDefaultPointClick = null;
  #onDeletePointClick = null;

  constructor({points = defaultPoint, offers, destinations, onFormSubmit, onDefaultPointClick, onDeletePointClick}) {
    super();
    this._setState(EditPointView.parsePointToState(points));
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onFormSubmit = onFormSubmit;
    this.#onDefaultPointClick = onDefaultPointClick;
    this.#onDeletePointClick = onDeletePointClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers, this.#destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.#setDatePickerFrom();
    this.#setDatePickerTo();
    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormEditClickHandler);
    }
    if (this.element.querySelector('.event__available-offers')) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler);
    }
  }

  static parsePointToState(points) {
    return {...points,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    };
  }

  static parseStateToPoint(state) {
    const points = {...state};
    delete points.isDisabled;
    delete points.isSaving;
    delete points.isDeleting;

    return points;
  }

  reset(points) {
    this.updateElement(
      EditPointView.parsePointToState(points)
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#onFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: this.#destinations.find(({name}) => name === evt.target.value).id
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
    });
  };

  #offersChangeHandler = (evt) => {
    const checked = evt.target.checked;
    const getSelected = (items, id) => Array.from(new Set([...items, id]));
    const getNotSelected = (items, id) => items.filter((idOffers) => idOffers !== id);
    const offers = checked ? getSelected(this._state.offers, evt.target.dataset.offerId) : getNotSelected(this._state.offers,evt.target.dataset.offerId);
    evt.preventDefault();
    this.updateElement({
      offers: offers
    });
  };

  #closeFormEditClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDefaultPointClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDeletePointClick(EditPointView.parseStateToPoint(this._state));
  };

  #setDatePickerFrom() {
    this.#datepicker = flatpickr(this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        maxDate:this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      });
  }

  #setDatePickerTo() {
    this.#datepicker = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler
      });
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };
}
