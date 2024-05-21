
import ListEventView from '../view/list-events-view';
import SortsView from './sorting-view';
import EditPointView from './edit-point-view';
import RoutePointView from './route-point-view';
import {render, replace} from '../framework/render';

export default class View {
  #listEventComponent = new ListEventView();
  #sortsView = new SortsView();
  #arrPoints = [];


  init(points, offers, destinations, listContainer) {

    render(this.#sortsView, listContainer);
    render(this.#listEventComponent, listContainer);

    this.#arrPoints = points.toSorted(() => 0.5 - Math.random()).slice(0, 4);

    this.#arrPoints.forEach((point) => {
      this.#renderPoints(point, offers, destinations);
    });
  }

  #renderPoints(point, offers, destinations) {

    function onDocumentKeydown(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeEditForm();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    }

    const pointComponent = new RoutePointView (
      point, offers, destinations,
      {
        onButtonClick: () => {
          openEditForm();
        }
      });

    const editPointComponet = new EditPointView(
      point, offers, destinations,
      {
        onFormSubmit: () => {
          closeEditForm();
        }
      });

    function openEditForm() {
      replace(editPointComponet, pointComponent);
      document.addEventListener('keydown', onDocumentKeydown);
    }

    function closeEditForm() {
      replace(pointComponent, editPointComponet);
      document.removeEventListener('keydown', onDocumentKeydown);

    }

    render(pointComponent, this.#listEventComponent.element);
  }
}
