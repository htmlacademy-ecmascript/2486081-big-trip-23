import AbstractView from '../../framework/view/abstract-view';
import {createFiltersTemplate} from './template';

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #onFilterChange = null;

  constructor({filters, currentFilter, onFilterChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#onFilterChange = onFilterChange;

    this.element.addEventListener('change', this.#filtersChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filtersChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onFilterChange(evt.target.value.toUpperCase());
  };
}
