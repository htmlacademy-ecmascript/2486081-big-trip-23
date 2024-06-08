import { FilterType, UpdateType } from '../const';
import {remove, render, replace} from '../framework/render';
import FiltersView from '../view/filter-view';
import { filter } from '../view/filter-view/utils';


export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;

  #filterModel = null;
  #pointsModel = null;

  constructor({filterContainer, pointModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handlerModelEvent);
    this.#filterModel.addObserver(this.#handlerModelEvent);

  }

  get filters() {
    const points = this.#pointsModel.points;
    return Object.values(FilterType).map((type) => ({type,count: filter[type](points).length}));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters: filters,
      currentFilter: this.#filterModel.filter,
      onFilterChange: this.#onFilterChange
    });

    if(prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handlerModelEvent = () => {
    this.init();
  };

  #onFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
