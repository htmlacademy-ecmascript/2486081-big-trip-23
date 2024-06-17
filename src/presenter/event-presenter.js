import {Mode, UpdatingType, UserAction} from '../const';
import {remove, render, replace} from '../framework/render';
import EditPointView from '../view/edit-point-view';
import RoutePointView from '../view/route-point-view';

export default class EventPresenter {
  #mode = Mode.DEFAULT;

  #listEventComponent = null;
  #pointComponent = null;
  #editPointComponent = null;

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
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new RoutePointView ({
      points: this.#points,
      offers:this.#offers,
      destinations: this.#destinations,

      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      points: this.#points,
      offers: this.#offers,
      destinations: this.#destinations,

      onFormSubmit: this.#handleFormSubmit,
      onDefaultPointClick: this.#handleDefaultPointClick,
      onDeletePointClick: this.#handleDeletePointClick
    });

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this.#pointComponent, this.#listEventComponent.element);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent,prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent,prevEditPointComponent);
    }
    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if(this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }
    const resetFormState = () => {
      this.#editPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editPointComponent.shake(resetFormState);
  }

  #switchToEdit() {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onDocumentKeydown);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #switchToDefaultPoint() {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onDocumentKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #onDocumentKeydown = (evt) =>{
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#points);
      this.#switchToDefaultPoint();
      document.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  };

  #handleEditClick = () => {
    this.#switchToEdit();
  };

  #handleDefaultPointClick = () => {
    this.#editPointComponent.reset(this.#points);
    this.#switchToDefaultPoint();
  };

  #handleFormSubmit = (point) => {
    this.#onDataChange(UserAction.UPDATE_DATA, UpdatingType.MINOR, point);
  };

  #handleFavoriteClick = () => {
    this.#onDataChange(UserAction.UPDATE_DATA, UpdatingType.PATCH, {...this.#points, isFavorite: !this.#points.isFavorite});
  };

  #handleDeletePointClick = (point) => {
    this.#onDataChange(UserAction.DELETE_DATA, UpdatingType.MINOR, point);
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#editPointComponent.reset(this.#points);
      this.#switchToDefaultPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }
}
