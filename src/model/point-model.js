import {MOCK_POINTS} from '../mock/points';
import {MOCK_OFFERS} from '../mock/offers';
import {MOCK_DESTINATION} from '../mock/destinations';
import Observable from '../framework/observable';
export default class PointsModel extends Observable {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor () {
    super();
    this.#points = MOCK_POINTS;
    this.#offers = MOCK_OFFERS;
    this.#destinations = MOCK_DESTINATION;

  }

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  updatePoints(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error ('error');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoints(updateType, update) {

    this.#points = [
      update,
      ...this.#points
    ];

    this._notify(updateType, update);
  }

  deletePoints(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error ('error');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
