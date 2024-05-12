import {createElement} from '../render';

function createListEventDetailsTemplate() {
  return '<section class="event__details"></section>';
}

export default class ListEventDetailsView {
  getTemplate() {
    return createListEventDetailsTemplate();
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
