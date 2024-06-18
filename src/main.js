import EventModel from './model/event-model';
import FilterModel from './model/filter-model';
import MainPresenter from './presenter/main-presenter';
import FilterPresenter from './presenter/filter-presenter';
import EventsApiService from './server/events-api-service';
import {AUTHORIZATION, END_POINT} from './const';

const infoTripElement = document.querySelector('.trip-main');
const filtersElement = document.querySelector('.trip-controls__filters');
const eventTripElement = document.querySelector('.trip-events');
const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

const eventsModel = new EventModel({eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({filterContainer: filtersElement, eventsModel, filterModel});
const mainPresenter = new MainPresenter({listContainer: eventTripElement, eventsModel, filterModel, buttonNewEvent, infoContainer: infoTripElement});

filterPresenter.init();
mainPresenter.init();
eventsModel.init();
