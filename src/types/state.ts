import {SortType, SortDirection} from '../const';
import {Guitar, GuitarsBranch, GuitarsInCart} from './types';
import {RootState} from '../store/root-reducer';

type AppData = {
  guitars: GuitarsBranch,
  guitar: Guitar,
  guitarsInCart: GuitarsInCart,
  discount: number,
  isDataLoaded: boolean,
  isGuitarLoaded: boolean,
  isCommentPosted: boolean,
  isCouponPosted: boolean,
}

type OptionProcess = {
  sortType: SortType,
  sortDirection: SortDirection,
  activePage: number,
}

type FilterProcess = {
  minPrice: number | string,
  maxPrice: number | string,
  guitarTypes: Array<string>,
  guitarStrings: Array<string>,
  availableStringCount: Array<string>,
}

type State = RootState;

export type {AppData, FilterProcess, OptionProcess, State};
