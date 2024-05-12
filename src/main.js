import ListPresenter from './presenter/list-presenter.js';
import PointsModel from './model/point-model.js';

const eventTripElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();

const listPresenter = new ListPresenter({listContainer: eventTripElement,
  pointsModel,
});

listPresenter.init();
