function createFilters(filters, currentFilter) {
  return (`
  ${filters.map((type) =>
      `<div class="trip-filters__filter">
    <input id="filter-${type.type.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type.type.toLowerCase()}" ${type.type === currentFilter ? 'checked' : ''} ${type.count === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type.type.toLowerCase()}">${type.type}</label>
    </div>`).join('')}
    `);
}

export function createFiltersTemplate(filters, currentFilter) {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${createFilters(filters, currentFilter)}
    </form>`
  );
}
