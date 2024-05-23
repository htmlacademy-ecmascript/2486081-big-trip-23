import View from '../view/view.js';
import PointsModel from '../model/point-model.js';
import { updateItem } from '../utils.js';
import SortsView from '../view/sorting-view/index.js';
import ListEventView from '../view/list-events-view/index.js';
import { render } from '../framework/render.js';
export default class ListPresenter {
  #model = new PointsModel();

  #sortsComponent = new SortsView();
  #listEventComponent = new ListEventView();

  #listContainer = null;

  #points = null;
  #offers = null;
  #destinations = null;

  #viewPoints = new Map();

  constructor({listContainer}) {
    this.#listContainer = listContainer;
  }

  init() {
    this.#points = [...this.#model.points];
    this.#offers = [...this.#model.offers];
    this.#destinations = [...this.#model.destinations];

    render(this.#sortsComponent, this.#listContainer);
    render(this.#listEventComponent, this.#listContainer);


    this.#pointsView(this.#points, this.#offers, this.#destinations);

  }

  #pointsView(points, offers, destinations) {
    points.toSorted(() => 0.5 - Math.random()).slice(0, 3).forEach((point) => {
      this.#view(point,offers, destinations);
    });
  }

  #view(point, offers, destinations) {
    const view = new View({
      listEventComponent: this.#listEventComponent,
      listContainer: this.#listContainer,
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange,
    });
    view.init(point, offers, destinations);
    this.#viewPoints.set(point.id, view);
  }

  #handleDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#viewPoints.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #handleModeChange = () => {
    this.#viewPoints.forEach((view) => view.resetView());
  };
}
