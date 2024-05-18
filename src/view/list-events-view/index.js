import AbstractView from '../../framework/view/abstract-view';
import { createListEventTemplate } from './template';

export default class ListEventView extends AbstractView {
  get template() {
    return createListEventTemplate();
  }
}
