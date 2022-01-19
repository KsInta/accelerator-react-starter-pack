import {FIRST_PAGE, MIN_PRICE, MAX_PRICE, SortType, SortDirection, availableStringCountByTypes} from '../const';

const MockData = {
  guitars: [],
  isDataLoaded: true,
};

const MockFilter = {
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  guitarTypes: [],
  guitarStrings: [],
  availableStringCount: availableStringCountByTypes,
};

const MockOption = {
  sortType: SortType.Default,
  sortDirection: SortDirection.Default,
  activePage: FIRST_PAGE,
};

export {MockData, MockFilter, MockOption};