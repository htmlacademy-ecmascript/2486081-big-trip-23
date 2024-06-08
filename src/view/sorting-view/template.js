import {TYPES_SORT} from '../../const';
import {disabled} from '../sorting-view/utils';

export function createSortTemplate(currentSort) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${TYPES_SORT.map((type) =>
      `<div class="trip-sort__item  trip-sort__item--${type}">
         <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${disabled(type)} ${currentSort === `sort-${type}` ? 'checked' : ''}>
         <label class="trip-sort__btn" for="sort-${type}">${type}</label>
       </div>`
    ).join('')}
       </form>`
  );
}
