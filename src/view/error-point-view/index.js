import AbstractView from '../../framework/view/abstract-view';
import {createErrorPointsTemplate} from './template';

export default class ErrorPointView extends AbstractView {
  get template() {
    return createErrorPointsTemplate();
  }
}
