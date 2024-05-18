import FilterPresenter from './presenter/filter-presenter.js';
import ListPresenter from './presenter/list-presenter.js';

const filtersElement = document.querySelector('.trip-controls__filters');
const eventTripElement = document.querySelector('.trip-events');

const filterPresenter = new FilterPresenter({filterContainer: filtersElement});
const listPresenter = new ListPresenter({listContainer: eventTripElement});

filterPresenter.init();
listPresenter.init();
