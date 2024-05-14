import SortsView from '../view/sort-view.js';
import ListEventView from '../view/list-events-view.js';
import EditPointView from '../view/edit-point-view.js';
import RoutePointView from '../view/route-point-view.js';
import {render} from '../render.js';
export default class ListPresenter {
  listEventComponent = new ListEventView();

  constructor({listContainer, pointsModel}) {
    this.listContainer = listContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    const points = [...this.pointsModel.getPoints()];
    const offers = [...this.pointsModel.getOffers()];
    const destinations = [...this.pointsModel.getDestinations()];

    render(new SortsView(), this.listContainer);//Сортировка
    render(this.listEventComponent, this.listContainer);//Контейнер для точек
    render(new EditPointView(points[Math.floor(Math.random() * 3)], offers, destinations), this.listEventComponent.getElement());//Форма редактирования

    points.forEach((point) => {
      render(new RoutePointView(point, offers, destinations), this.listEventComponent.getElement());//Обычная точка
    });
  }
}
