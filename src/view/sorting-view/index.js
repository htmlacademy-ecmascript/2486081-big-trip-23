import AbstractView from '../../framework/view/abstract-view';
import {createSortTemplate} from './template';

export default class SortingView extends AbstractView {
  #onSortingChange = null;
  #currentSortType = null;

  constructor({onSortingChange, currentSortType}) {
    super();
    this.#onSortingChange = onSortingChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('click', this.#sortingClickHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortingClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this.#onSortingChange(evt.target.value);
  };
}
