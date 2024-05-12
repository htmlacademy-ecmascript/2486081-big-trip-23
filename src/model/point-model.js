import {getRandomPoints} from '../mock/points.js';
import {getRandomOffers} from '../mock/offers.js';
import {getRandomDestinations} from '../mock/destinations.js';

export default class PointsModel {
  constructor () {
    this.points = Array.from({length: 3}, getRandomPoints);
    this.offers = Array.from({length: 5}, getRandomOffers);
    this.destinations = Array.from({length: 3},getRandomDestinations);

  }

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }
}
