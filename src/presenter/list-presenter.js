import View from '../view/view.js';
import PointsModel from '../model/point-model.js';
export default class ListPresenter {
  #listContainer = null;
  #model = new PointsModel();
  #view = new View();

  constructor({listContainer}) {
    this.#listContainer = listContainer;
  }

  init() {
    const points = [...this.#model.points];
    const offers = [...this.#model.offers];
    const destinations = [...this.#model.destinations];

    this.#view.init(points, offers, destinations, this.#listContainer);
  }
}
