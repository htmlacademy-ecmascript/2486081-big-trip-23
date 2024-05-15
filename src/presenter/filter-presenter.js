import { render } from '../render.js';
import FiltersView from '../view/filter-view.js';

export default class FilterPresenter {

  constructor({filterContainer}) {
    this.filterContainer = filterContainer;
  }

  init() {
    render(new FiltersView(), this.filterContainer);
  }
}
