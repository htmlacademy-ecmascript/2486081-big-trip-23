import FilterPresenter from './presenter/filter-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/point-model.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const eventTripElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const filterPresenter = new FilterPresenter({filterContainer: filtersElement});
const listPresenter = new ListPresenter({listContainer: eventTripElement,
  pointsModel,
});

filterPresenter.init();
listPresenter.init();
