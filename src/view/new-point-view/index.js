import AbstractView from '../../framework/view/abstract-view';
import { createNewPointTemplate } from './template';

export default class NewPoinView extends AbstractView {
  get template() {
    return createNewPointTemplate();
  }
}
