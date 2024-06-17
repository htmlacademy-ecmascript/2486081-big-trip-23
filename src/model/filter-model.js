import {FilteringType} from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  #filter = FilteringType.EVERYTHING;

  get filter() {
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
