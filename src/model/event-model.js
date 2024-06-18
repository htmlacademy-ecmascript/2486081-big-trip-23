import Observable from '../framework/observable';
import {UpdatingType} from '../const';

export default class EventModel extends Observable {
  #eventsApiService = null;
  #points = [];
  #offers = [];
  #destinations = [];
  #isError = true;

  constructor ({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
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

  get isErrorPoint() {
    return this.#isError;
  }

  async init() {
    try {
      this.#isError = false;
      const points = await this.#eventsApiService.points;
      const offers = await this.#eventsApiService.offers;
      const destinations = await this.#eventsApiService.destinations;

      this.#points = points.map(this.#adaptToClient);
      this.#offers = offers;
      this.#destinations = destinations;
    } catch(err) {
      this.#isError = true;
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdatingType.INIT);
  }

  async updatePoints(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error ('error');
    }
    try {
      const response = await this.#eventsApiService.updatePoints(update);
      const updatePoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        updatePoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatePoint);
    } catch(err) {
      throw new Error ('error');
    }
  }

  async addPoints(updateType, update) {
    try {
      const response = await this.#eventsApiService.addPoints(update);
      const newPoint = this.#adaptToClient(response);

      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error ('error');
    }
  }

  async deletePoints(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error ('error');
    }
    try {
      await this.#eventsApiService.deletePoints(update);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType);
    } catch(err) {
      throw new Error ('error');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {... point,
      'basePrice': point['base_price'],
      'dateFrom': new Date(point['date_from']),
      'dateTo': new Date(point['date_to']),
      'isFavorite': point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
