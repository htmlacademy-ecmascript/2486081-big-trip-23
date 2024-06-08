import {RenderPosition, remove, render} from '../framework/render';
import {UpdateType, UserAction} from '../const';
import NewPointView from '../view/new-point-view';

export default class NewPointPresenter {
  #newPointComponet = null;
  #listContainer = null;
  #onDataChange = null;
  #buttonAddEvent = null;

  constructor({listContainer, onDataChange, buttonAddEvent}) {
    this.#listContainer = listContainer;
    this.#onDataChange = onDataChange;
    this.#buttonAddEvent = buttonAddEvent;
  }

  init(offers, destinations) {
    if(this.#newPointComponet !== null) {
      return;
    }
    this.#newPointComponet = new NewPointView({
      offers: offers,
      destinations: destinations,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handelCancelClick
    });

    render(this.#newPointComponet, this.#listContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointComponet === null) {
      return;
    }
    this.#buttonAddEvent.disabled = false;

    remove(this.#newPointComponet);
    this.#newPointComponet = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (points) => {
    this.#onDataChange(UserAction.ADD_DATA, UpdateType.MINOR, points);
  };

  #handelCancelClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
