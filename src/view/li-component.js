import {createElement} from '../render';

function createLiComponent() {
  return '<li class="trip-events__item"></li>';
}

export default class LiComponent {
  getTemplate() {
    return createLiComponent();
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
