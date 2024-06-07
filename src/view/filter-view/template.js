export function createFiltersTemplate(filter, currentFilter) {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${filter.map((type) =>
      `<div class="trip-filters__filter">
        <input id="filter-${type.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type.type.toLowerCase()}" ${type.type === currentFilter ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${type.type.toLowerCase()}">${type.type}</label>
      </div>`).join('')}
    </form>`
  );
}
