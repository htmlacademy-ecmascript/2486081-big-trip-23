import {MOCK_POINTS} from '../mock/points.js';
import {MOCK_OFFERS} from '../mock/offers.js';
import {MOCK_DESTINATION} from '../mock/destinations.js';

export default class PointsModel {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor () {
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
}
