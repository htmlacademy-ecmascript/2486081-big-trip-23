import FiltersView from '../view/filter-view.js';
import SortsView from '../view/sort-view.js';
import ListEventView from '../view/list-events-view.js';
import RoutePointView from '../view/route-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import {render} from '../render.js';

const eventTripElement = document.querySelector('.trip-events');
const filtersElement = document.querySelector('.trip-controls__filters');

export default class ListPresenter {

  listEventComponent = new ListEventView();

  init() {
    render(new FiltersView(), filtersElement);
    render(new SortsView(), eventTripElement);
    render(this.listEventComponent, eventTripElement);
    render(new EditPointView(), this.listEventComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new RoutePointView(), this.listEventComponent.getElement());
    }
  }
}
