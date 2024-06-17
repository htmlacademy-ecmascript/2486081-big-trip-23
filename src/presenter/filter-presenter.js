import {FilteringType, UpdatingType} from '../const';
import {remove, render, replace} from '../framework/render';
import {Filter} from '../view/filter-view/utils';
import FiltersView from '../view/filter-view';

export default class FilterPresenter {
  #filterContainer = null;
  #filterComponent = null;
  #filterModel = null;
  #eventsModel = null;

  constructor({filterContainer, eventsModel, filterModel}) {
    this.#filterContainer = filterContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventsModel.addObserver(this.#handlerModelEvent);
    this.#filterModel.addObserver(this.#handlerModelEvent);

  }

  get filters() {
    const points = this.#eventsModel.points;
    return Object.values(FilteringType).map((type) => ({type,count: Filter[type](points).length}));
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
    this.#filterModel.setFilter(UpdatingType.MAJOR, filterType);
  };
}
