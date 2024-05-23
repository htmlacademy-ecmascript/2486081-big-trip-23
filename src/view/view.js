import EditPointView from './edit-point-view';
import RoutePointView from './route-point-view';
import {remove, render, replace} from '../framework/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class View {
  #listEventComponent = null;
  #onDataChange = null;
  #onModeChange = null;

  #points = null;
  #offers = null;
  #destinations = null;

  #pointComponent = null;
  #editPointComponet = null;

  #mode = Mode.DEFAULT;

  constructor({listEventComponent, onDataChange, onModeChange}) {
    this.#listEventComponent = listEventComponent;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
  }

  init(points, offers, destinations) {
    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;


    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponet = this.#editPointComponet;

    this.#pointComponent = new RoutePointView ({
      points: this.#points,
      offers:this.#offers,
      destinations: this.#destinations,

      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponet = new EditPointView({
      points: this.#points,
      offers: this.#offers,
      destinations: this.#destinations,

      onFormSubmit: this.#handleFormSubmit
    });

    if (prevPointComponent === null || prevEditPointComponet === null) {
      render(this.#pointComponent, this.#listEventComponent.element);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent,prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#editPointComponet,prevEditPointComponet);
    }


    remove(prevPointComponent);
    remove(prevEditPointComponet);

  }

  #switchToEdit() {
    replace(this.#editPointComponet, this.#pointComponent);
    document.addEventListener('keydown', this.#onDocumentKeydown);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #switchToDefaultPoint() {
    replace(this.#pointComponent, this.#editPointComponet);
    document.removeEventListener('keydown', this.#onDocumentKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #onDocumentKeydown = (evt) =>{
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#switchToDefaultPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  };

  #handleEditClick = () => {
    this.#switchToEdit();
  };

  #handleFormSubmit = (point) => {
    this.#onDataChange(point);
    this.#switchToDefaultPoint();
  };

  #handleFavoriteClick = () => {
    this.#onDataChange({...this.#points, isFavorite: !this.#points.isFavorite});
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#switchToDefaultPoint();
    }
  }
}
