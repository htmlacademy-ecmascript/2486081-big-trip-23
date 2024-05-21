import AbstractView from '../../framework/view/abstract-view';
import {createFiltersTemplate} from './template';

export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
