import {Mode, UpdateType, UserAction} from '../const';
import {remove, render, replace} from '../framework/render';
import EditPointView from './edit-point-view';
import RoutePointView from './route-point-view';

export default class View {
  #mode = Mode.DEFAULT;

  #listEventComponent = null;
  #pointComponent = null;
  #editPointComponet = null;

  #points = null;
  #offers = null;
  #destinations = null;

  #onDataChange = null;
  #onModeChange = null;

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

      onFormSubmit: this.#handleFormSubmit,
      onDefailtPointClick: this.#handleDefailtPointClick,
      onDeletePointClick: this.#handleDeletePointClick
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
      this.#editPointComponet.reset(this.#points);
      this.#switchToDefaultPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  };

  #handleEditClick = () => {
    this.#switchToEdit();
  };

  #handleDefailtPointClick = () => {
    this.#editPointComponet.reset(this.#points);
    this.#switchToDefaultPoint();
  };

  #handleFormSubmit = (point) => {
    this.#onDataChange(UserAction.UPDATE_DATA, UpdateType.MINOR, point);
    this.#switchToDefaultPoint();
  };

  #handleFavoriteClick = () => {
    this.#onDataChange(UserAction.UPDATE_DATA, UpdateType.PATCH, {...this.#points, isFavorite: !this.#points.isFavorite});
  };

  #handleDeletePointClick = (point) => {
    this.#onDataChange(UserAction.DELETE_DATA, UpdateType.MINOR, point);
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponet.reset(this.#points);
      this.#switchToDefaultPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponet);
  }
}
