import { MessagaFilters } from '../../const';

export function createNoPointTemplate(filterType) {
  return `<p class="trip-events__msg">${MessagaFilters[filterType]}</p>`;
}
