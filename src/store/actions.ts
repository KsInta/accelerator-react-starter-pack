import {ActionType, Actions} from '../types/actions';
import {Guitars} from '../types/types';
import {SortType, SortDirection} from '../const';

const loadGuitars = (guitars: Guitars): Actions => ({
  type: ActionType.LoadGuitars,
  payload: guitars,
});

const loadFilteredGuitars = (guitars: Guitars): Actions => ({
  type: ActionType.LoadFilteredGuitars,
  payload: guitars,
});

const toggleIsLoading = (isLoading: boolean): Actions => ({
  type: ActionType.IsDataLoaded,
  payload: isLoading,
});

const changeSorting = (option: SortType): Actions => ({
  type: ActionType.ChangeSorting,
  payload: option,
});

const changeSortingDirection = (option: SortDirection): Actions => ({
  type: ActionType.ChangeSortingDirection,
  payload: option,
});

const changeMinPrice = (price: number | string): Actions => ({
  type: ActionType.ChangeMinPrice,
  payload: price,
});

const changeMaxPrice = (price: number | string): Actions => ({
  type: ActionType.ChangeMaxPrice,
  payload: price,
});

const changeGuitarTypes = (types: Array<string>): Actions => ({
  type: ActionType.ChangeGuitarTypes,
  payload: types,
});

const changeGuitarStrings = (strings: Array<string>): Actions => ({
  type: ActionType.ChangeGuitarStrings,
  payload: strings,
});

const changeAvailableStringCount = (strings: Array<string>): Actions => ({
  type: ActionType.ChangeAvailableStringCount,
  payload: strings,
});

const changeActivePage = (page: number): Actions => ({
  type: ActionType.ChangeActivePage,
  payload: page,
});

export {loadGuitars, loadFilteredGuitars, toggleIsLoading, changeSorting, changeSortingDirection, changeMinPrice, changeMaxPrice, changeGuitarTypes, changeGuitarStrings, changeAvailableStringCount, changeActivePage};
