import {FilterType, SortingType, UpdateType, UserAction} from '../const';
import {sortingByDay, sortingByPrice, sortingByTime} from '../view/sorting-view/utils';

import {remove, render} from '../framework/render';
import {filter} from '../view/filter-view/utils';

import NewPointPresenter from '../presenter/new-point-presenter';
import NoPointView from '../view/no-point-view/index';
import ListEventView from '../view/list-events-view/index';
import SortsView from '../view/sorting-view/index';
import View from '../view/view';


export default class ListPresenter {
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortingType.DAY;

  #pointModel = null;
  #filterModel = null;

  #listContainer = null;
  #sortsComponent = null;
  #listEventComponent = null;
  #noPointsComponent = null;

  #viewPoints = new Map();

  #newPointPresenter = null;
  #buttonAddEvent = null;

  constructor({listContainer, pointModel, filterModel, buttonNewEvent}) {
    this.#listContainer = listContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;
    this.#buttonAddEvent = buttonNewEvent;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;

    const points = this.#pointModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortingType.DAY:
        return filteredPoints.sort(sortingByDay);
      case SortingType.TIME:
        return filteredPoints.sort(sortingByTime);
      case SortingType.PRICE:
        return filteredPoints.sort(sortingByPrice);
    }

    return filteredPoints;
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  init() {
    this.#renderInterface();
  }

  #renderInterface() {
    const points = this.points;

    this.#listEventComponent = new ListEventView({listContainer: this.#listContainer});
    this.#newPointPresenter = new NewPointPresenter({
      listContainer: this.#listEventComponent.element,
      onDataChange: this.#handleViewAction,
      buttonAddEvent: this.#buttonAddEvent
    });
    this.#buttonAddEvent.addEventListener('click', () => {
      this.#buttonAddEvent.disabled = true;
      this.createNewPoint(this.offers, this.destinations);
    });

    if(points.length === 0) {
      this.#renderMessagesNoPoints();
    } else {
      this.#renderSort();
      this.#renderContainerPoints();
      this.#renderPoints();
    }
  }

  #renderMessagesNoPoints() {
    this.#noPointsComponent = new NoPointView({
      filterType: this.#filterType
    });
    render(this.#noPointsComponent, this.#listContainer);
  }

  #renderSort() {
    this.#sortsComponent = new SortsView(
      {
        onSortingChange: this.#handleSortChange,
        currentSortType: this.#currentSortType
      });
    render(this.#sortsComponent, this.#listContainer);
  }

  #renderContainerPoints() {
    render(this.#listEventComponent, this.#listContainer);
  }

  #renderPoints() {
    const points = this.points;
    this.#pointsView(points, this.offers, this.destinations);
  }

  #pointsView(points, offers, destinations) {
    points.forEach((point) => {
      this.#view(point,offers, destinations);
    });
  }

  #view(point, offers, destinations) {
    const view = new View({
      listEventComponent: this.#listEventComponent,
      listContainer: this.#listContainer,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    view.init(point, offers, destinations);
    this.#viewPoints.set(point.id, view);
  }

  createNewPoint(offers, destinations) {
    this.#currentSortType = SortingType.DAY;
    //this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init(offers, destinations);
  }

  #handleSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPoints();
    this.#renderInterface();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#viewPoints.forEach((view) => view.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_DATA:
        this.#pointModel.updatePoints(updateType, update);
        break;
      case UserAction.ADD_DATA:
        this.#pointModel.addPoints(updateType, update);
        break;
      case UserAction.DELETE_DATA:
        this.#pointModel.deletePoints(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#viewPoints.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderInterface();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType: true});
        this.#renderInterface();
        break;
    }
  };

  #clearPoints({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#viewPoints.forEach((view) => view.destroy());
    this.#viewPoints.clear();
    remove(this.#sortsComponent);
    remove(this.#listEventComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
    }
  }

}
