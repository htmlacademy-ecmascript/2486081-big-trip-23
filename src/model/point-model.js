import {mockPoints} from '../mock/points.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';

export default class PointsModel {
  constructor () {
    this.points = mockPoints;
    this.offers = mockOffers;
    this.destinations = mockDestinations;

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
