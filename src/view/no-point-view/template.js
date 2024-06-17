import {MessagesFilters} from '../../const';

export function createNoPointTemplate(filterType) {
  return `<p class="trip-events__msg">${MessagesFilters[filterType]}</p>`;
}
