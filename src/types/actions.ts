import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './state';
import {Guitars} from './types';
import {SortType, SortDirection} from '../const';

const enum ActionType {
  ChangeSorting = 'option/changeSorting',
  ChangeSortingDirection = 'option/changeSortingDirection',
  LoadGuitars = 'data/loadGuitars',
  IsDataLoaded = 'data/isLoading',
  ChangeMinPrice = 'filter/changeMinPrice',
  ChangeMaxPrice = 'filter/changeMaxPrice',
  ChangeGuitarTypes = 'filter/changeGuitarTypes',
  ChangeGuitarStrings = 'filter/changeGuitarStrings',
  ChangeAvailableStringCount = 'filter/changeAvailableStringCount',
  ChangePagesCount = 'option/changePageCount',
  ChangeActivePage = 'option/changeActivePage',
}

type LoadGuitarsAction = {
  type: ActionType.LoadGuitars,
  payload: Guitars,
}

type IsDataLoadedAction = {
  type: ActionType.IsDataLoaded,
  payload: boolean,
}

type ChangeSortingAction = {
  type: ActionType.ChangeSorting,
  payload: SortType,
}

type ChangeSortingDirectionAction = {
  type: ActionType.ChangeSortingDirection,
  payload: SortDirection,
}

type ChangeMinPriceAction = {
  type: ActionType.ChangeMinPrice,
  payload: number | string,
}

type ChangeMaxPriceAction = {
  type: ActionType.ChangeMaxPrice,
  payload: number | string,
}

type ChangeGuitarTypesAction = {
  type: ActionType.ChangeGuitarTypes,
  payload: Array<string>,
}

type ChangeGuitarStringsAction = {
  type: ActionType.ChangeGuitarStrings,
  payload: Array<string>,
}

type ChangeAvailableStringCountAction = {
  type: ActionType.ChangeAvailableStringCount,
  payload: Array<string>,
}

type ChangePagesCountAction = {
  type: ActionType.ChangePagesCount,
  payload: Array<number>,
}

type ChangeActivePageAction = {
  type: ActionType.ChangeActivePage,
  payload: number,
}

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

type Actions = LoadGuitarsAction | IsDataLoadedAction | ChangeSortingAction | ChangeSortingDirectionAction | ChangeMinPriceAction | ChangeMaxPriceAction | ChangeGuitarTypesAction | ChangeGuitarStringsAction | ChangeAvailableStringCountAction | ChangePagesCountAction | ChangeActivePageAction;

export {ActionType};

export type {Actions, ThunkActionResult, ThunkAppDispatch};
