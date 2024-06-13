import {FilterType, SortingType, TimeLimit, UpdateType, UserAction} from '../const.js';
import {sortingByDay, sortingByPrice, sortingByTime} from '../view/sorting-view/utils.js';
import {remove, render} from '../framework/render.js';
import {filter} from '../view/filter-view/utils.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import InfoTripPresenter from './info-trip-presenter.js';
import NewEventPresenter from '../presenter/new-event-presenter';
import ListEventView from '../view/list-events-view/index';
import LoadingView from '../view/loading-view.js/index.js';
import NoPointView from '../view/no-point-view/index';
import SortsView from '../view/sorting-view/index';
import EventPresenter from '../presenter/event-presenter';
import ErrorPoint from '../view/error-point-view/index.js';

export default class MainPresenter {
  #filterType = FilterType.EVERYTHING;
  #currentSortType = SortingType.DAY;
  #eventsModel = null;
  #filterModel = null;
  #listContainer = null;
  #infoContainer = null;
  #sortsComponent = null;
  #listEventComponent = null;
  #noPointsComponent = null;
  #loadingComponent = new LoadingView();
  #InfoTripPresenter = null;
  #NewEventPresenter = null;
  #pointsMap = new Map();
  #buttonAddEvent = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  #errorComponent = new ErrorPoint();

  constructor({listContainer, eventsModel, filterModel, buttonNewEvent, infoContainer}) {
    this.#listContainer = listContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#buttonAddEvent = buttonNewEvent;
    this.#infoContainer = infoContainer;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#eventsModel.points;
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
    return this.#eventsModel.offers;
  }

  get destinations() {
    return this.#eventsModel.destinations;
  }

  init() {
    this.#renderInterface();
  }

  #renderInterface() {
    const points = this.points;

    if(this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if(this.#eventsModel.isErrorPoint) {
      this.#buttonAddEvent.disabled = true;
      render(this.#errorComponent, this.#listContainer);
      return;
    }

    this.#listEventComponent = new ListEventView({listContainer: this.#listContainer});
    this.#NewEventPresenter = new NewEventPresenter({
      listContainer: this.#listEventComponent.element,
      onDataChange: this.#handleViewAction,
      buttonAddEvent: this.#buttonAddEvent
    });

    this.#buttonAddEvent.addEventListener('click', () => {
      this.#handleModeChange();
      this.#buttonAddEvent.disabled = true;
      this.createNewPoint(this.offers, this.destinations);
    });

    if(points.length === 0) {
      this.#renderMessagesNoPoints();
      return;
    }

    this.#InfoTripPresenter = new InfoTripPresenter({
      infoContainer: this.#infoContainer,
      eventsModel: this.#eventsModel
    });

    this.#InfoTripPresenter.init();
    this.#renderSort();
    this.#renderContainerPoints();
    this.#renderPoints();

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
    points.forEach((point) => {
      this.#EventView(point,this.offers, this.destinations);
    });
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#listContainer);
  }

  #EventView(point, offers, destinations) {
    const events = new EventPresenter({
      listEventComponent: this.#listEventComponent,
      listContainer: this.#listContainer,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    events.init(point, offers, destinations);
    this.#pointsMap.set(point.id, events);
  }

  createNewPoint(offers, destinations) {
    this.#currentSortType = SortingType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#NewEventPresenter.init(offers, destinations);
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
    this.#NewEventPresenter.destroy();
    this.#pointsMap.forEach((view) => view.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch(actionType) {
      case UserAction.UPDATE_DATA:
        this.#pointsMap.get(update.id).setSaving();
        try {
          await this.#eventsModel.updatePoints(updateType, update);
        } catch(err) {
          this.#pointsMap.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_DATA:
        this.#NewEventPresenter.setSaving();
        try {
          await this.#eventsModel.addPoints(updateType, update);
        } catch {
          this.#NewEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_DATA:
        this.#pointsMap.get(update.id).setDeleting();
        try {
          await this.#eventsModel.deletePoints(updateType, update);
        } catch {
          this.#pointsMap.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = async (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointsMap.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPoints();
        this.#renderInterface();
        break;
      case UpdateType.MAJOR:
        this.#clearPoints({resetSortType: true});
        this.#renderInterface();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderInterface();
        break;
    }
  };

  #clearPoints({resetSortType = false} = {}) {
    this.#NewEventPresenter.destroy();
    this.#InfoTripPresenter.destroy();

    this.#pointsMap.forEach((view) => view.destroy());
    this.#pointsMap.clear();

    remove(this.#sortsComponent);
    remove(this.#loadingComponent);
    remove(this.#listEventComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
    }
  }
}
