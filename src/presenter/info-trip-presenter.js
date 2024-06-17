import {RenderPosition, remove, render, replace} from '../framework/render';
import {sortByDays} from '../view/sorting-view/utils';
import InfoTripView from '../view/info-trip-view';

export default class InfoTripPresenter {
  #infoContainer = null;
  #infoTripComponent = null;
  #eventsModel = null;

  constructor({infoContainer, eventsModel}) {
    this.#infoContainer = infoContainer;
    this.#eventsModel = eventsModel;
  }

  init() {
    const point = this.#eventsModel.points.toSorted(sortByDays);
    const offers = this.#eventsModel.offers;
    const destinations = this.#eventsModel.destinations;

    const prevInfoTripComponent = this.#infoTripComponent;

    this.#infoTripComponent = new InfoTripView ({
      point,
      offers,
      destinations,
    });

    if (prevInfoTripComponent === null) {
      render(this.#infoTripComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#infoTripComponent, prevInfoTripComponent);
    remove(prevInfoTripComponent);
  }

  destroy() {
    remove(this.#infoTripComponent);
  }
}
