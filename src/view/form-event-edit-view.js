import {createElement} from '../render';

function createFormEventEdit() {
  return '<form class="event event--edit" action="#" method="post"></form>';
}

export default class FormEventEdit {
  getTemplate() {
    return createFormEventEdit();
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
