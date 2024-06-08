import {defaultPoints} from '../../const';
import {createNewPointTemplate} from './template';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class NewPointView extends AbstractStatefulView {
  #datepicker = null;

  constructor({points = defaultPoints, offers, destinations, onFormSubmit, onCancelClick}) {
    super();
    this._setState(NewPointView.parsePointToState(points));
    this.offers = offers;
    this.destinations = destinations;

    this.onFormSubmit = onFormSubmit;
    this.onCancelClick = onCancelClick;

    this._restoreHandlers();
  }

  get template() {
    return createNewPointTemplate(this._state, this.offers, this.destinations);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.#setDatePickerFrom();
    this.#setDatePickerTo();
  }

  static parsePointToState(points) {
    return {...points};
  }

  static parseStateToPoint(state) {
    const points = {...state};
    return points;
  }

  reset(points) {
    this.updateElement(
      NewPointView.parsePointToState(points)
    );
  }

  removeElement() {
    super.removeElement();
    if(this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      id: `${Math.floor(Math.random() * 100)}`
    });
    this.onFormSubmit(NewPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: evt.target.value
    });
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      destination: this.destinations.find(({name}) => name === evt.target.value).id
    });
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
    });
  };


  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.onCancelClick();
  };

  #setDatePickerFrom() {
    this.#datepicker = flatpickr(this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'Y/m/d H:i',
        maxDate:this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      });
  }

  #setDatePickerTo() {
    this.#datepicker = flatpickr(this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'Y/m/d H:i',
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
