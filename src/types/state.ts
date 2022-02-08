import {SortType, SortDirection} from '../const';
import {Comments, Guitar, Guitars} from './types';
import {RootState} from '../store/root-reducer';

type AppData = {
  guitars: Guitars,
  guitar: Guitar,
  guitarComments: Comments,
  isDataLoaded: boolean,
  isGuitarLoaded: boolean,
  isCommentPosted: boolean,
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
