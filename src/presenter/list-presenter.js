import FiltersView from '../view/filter-view.js';
import SortsView from '../view/sort-view.js';
import ListEventView from '../view/list-events-view.js';
import RoutePointView from '../view/route-point-view.js';
import NewPoinView from '../view/new-point-view.js';

import LiComponent from '../view/li-component.js';
import FormEventEdit from '../view/form-event-edit-view.js';
import HeaderEditPointTemplate from '../view/header-edit-point-view.js';
import ListEventDetailsView from '../view/list-events-details-view.js';
import OffersEditPointTemplate from '../view/offers-edit-point-view.js';
import DestionationEditPointTemplate from '../view/destination-edit-point-view.js';

import {render} from '../render.js';

const filtersElement = document.querySelector('.trip-controls__filters');

export default class ListPresenter {

  listEventComponent = new ListEventView();
  listEventDetailsComponent = new ListEventDetailsView();
  liComponent = new LiComponent();
  formEventEditComponent = new FormEventEdit();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    const points = [...this.pointsModel.getPoints()];
    const offers = [...this.pointsModel.getOffers()];
    const destinations = [...this.pointsModel.getDestinations()];

    render(new FiltersView(points, offers, destinations), filtersElement);
    render(new SortsView(), this.listContainer);

    render(this.listEventComponent, this.listContainer);

    render(this.liComponent,this.listEventComponent.getElement());
    render(this.formEventEditComponent, this.liComponent.getElement());
    render(new HeaderEditPointTemplate(points[2], destinations), this.formEventEditComponent.getElement());
    render (this.listEventDetailsComponent, this.formEventEditComponent.getElement());
    render(new OffersEditPointTemplate(offers), this.listEventDetailsComponent.getElement());
    render(new DestionationEditPointTemplate(destinations), this.listEventDetailsComponent.getElement());
    render(new NewPoinView(), this.listEventComponent.getElement());

    points.forEach((point) => {
      render(new RoutePointView(point, offers, destinations), this.listEventComponent.getElement());
    });
  }
}
