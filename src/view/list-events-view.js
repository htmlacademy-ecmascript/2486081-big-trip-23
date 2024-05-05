import {createElement} from '../render';

function createListEventTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListEventView {
  getTemplate() {
    return createListEventTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
