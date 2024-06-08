import { render } from '../../framework/render';
import AbstractView from '../../framework/view/abstract-view';
import {createListEventTemplate} from './template';

export default class ListEventView extends AbstractView {
  #listContainer = null;

  constructor({listContainer}) {
    super();
    this.#listContainer = listContainer;
    render(this,this.#listContainer);
  }

  get template() {
    return createListEventTemplate();
  }
}
