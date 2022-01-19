import {SortType, SortDirection} from '../const';
import {Guitar, Guitars} from './types';
import {RootState} from '../store/root-reducer';

type AppData = {
  guitars: Guitars,
  isDataLoaded: boolean,
}

type OptionProcess = {
  sortType: SortType,
  sortDirection: SortDirection,
  activePage: number,
}

type FilterProcess = {
  minPrice: number,
  maxPrice: number,
  guitarTypes: Array<string>,
  guitarStrings: Array<number>,
  availableStringCount: Array<number>,
}

type State = RootState;

export type {AppData, FilterProcess, OptionProcess, State};
