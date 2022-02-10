import {FIRST_PAGE, SortType, SortDirection, availableStringCountByTypes} from '../const';
import {MIN_PRICE, MAX_PRICE} from './mock';

const MockData = {
  guitars: [],
  guitar: {},
  isDataLoaded: false,
  isGuitarLoaded: false,
  isCommentPosted: false,
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
