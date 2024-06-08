import FilterPresenter from './presenter/filter-presenter';
import ListPresenter from './presenter/list-presenter';
import PointsModel from './model/point-model';
import FilterModel from './model/filter-model';

const filtersElement = document.querySelector('.trip-controls__filters');
const eventTripElement = document.querySelector('.trip-events');
const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

const pointModel = new PointsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({filterContainer: filtersElement, pointModel, filterModel});
const listPresenter = new ListPresenter({listContainer: eventTripElement, pointModel, filterModel, buttonNewEvent});

filterPresenter.init();
listPresenter.init();
