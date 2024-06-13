import {TYPES_SORT} from '../../const';
import {isDisabled, isChecked} from '../sorting-view/utils';

function createSort(currentSort) {
  return (`
    ${TYPES_SORT.map((type) =>
      `<div class="trip-sort__item  trip-sort__item--${type}">
      <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isDisabled(type)} ${isChecked(currentSort, type)}>
      <label class="trip-sort__btn" for="sort-${type}">${type}</label>
      </div>`).join('')}`
  );
}

export function createSortTemplate(currentSort) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSort(currentSort)}
    </form>`
  );
}
