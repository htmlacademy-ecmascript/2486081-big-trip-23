import AbstractView from '../../framework/view/abstract-view';
import {createLoadingMessageTemplate} from './template';

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingMessageTemplate();
  }
}
