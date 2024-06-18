import {createListEventTemplate} from './template';
import {render} from '../../framework/render';
import AbstractView from '../../framework/view/abstract-view';

export default class ListEventsView extends AbstractView {
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
