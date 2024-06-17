import {RenderPosition, remove, render} from '../framework/render';
import {FilteringType, UpdatingType, UserAction} from '../const';
import EditPointView from '../view/edit-point-view';
import NoPointView from '../view/no-point-view';

export default class NewPointPresenter {
  #points = null;
  #newPointComponent = null;
  #listContainer = null;
  #onDataChange = null;
  #buttonAddEvent = null;
  #noPointsComponent = new NoPointView({filterType: FilteringType.EVERYTHING});

  constructor({listContainer, onDataChange, buttonAddEvent}) {
    this.#listContainer = listContainer;
    this.#onDataChange = onDataChange;
    this.#buttonAddEvent = buttonAddEvent;
  }

  init(points, offers, destinations) {
    this.#points = points;
    if(this.#newPointComponent !== null) {
      return;
    }
    this.#newPointComponent = new EditPointView({
      offers: offers,
      destinations: destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeletePointClick: this.#handelCancelClick
    });

    render(this.#newPointComponent, this.#listContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }
    this.#buttonAddEvent.disabled = false;

    remove(this.#newPointComponent);
    this.#newPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#newPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#newPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#newPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (points) => {
    this.#onDataChange(UserAction.ADD_DATA, UpdatingType.MINOR, points);
  };

  #noPoints () {
    if(this.#points.length === 0) {
      render(this.#noPointsComponent, this.#listContainer);
    }
  }

  #handelCancelClick = () => {
    this.#noPoints();
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#noPoints();
      this.destroy();
    }
  };
}
