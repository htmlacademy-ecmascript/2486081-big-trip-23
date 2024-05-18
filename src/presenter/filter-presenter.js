import {render} from '../framework/render.js';
import FiltersView from '../view/filter-view';


export default class FilterPresenter {
  #filterContainer = null;

  constructor({filterContainer}) {
    this.#filterContainer = filterContainer;
  }

  init() {
    render(new FiltersView(), this.#filterContainer);
  }
}
