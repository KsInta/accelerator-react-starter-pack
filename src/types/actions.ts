import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './state';
import {Guitar, GuitarsBranch, GuitarsInCart} from './types';
import {SortType, SortDirection} from '../const';

const enum ActionType {
  ChangeSorting = 'option/changeSorting',
  ChangeSortingDirection = 'option/changeSortingDirection',
  LoadGuitars = 'data/loadGuitars',
  LoadGuitar = 'data/loadGuitar',
  ChangeGuitarsInCart = 'data/changeGuitarsInCart',
  ChangeDiscount = 'data/changeDiscount',
  IsDataLoaded = 'data/isLoading',
  IsGuitarLoaded = 'data/isGuitarLoaded',
  IsCommentPosted = 'data/isCommentPosting',
  IsCouponPosted = 'data/isCouponPosting',
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
  payload: GuitarsBranch,
}

type LoadGuitarAction = {
  type: ActionType.LoadGuitar,
  payload: Guitar,
}

type ChangeGuitarsInCartAction = {
  type: ActionType.ChangeGuitarsInCart,
  payload: GuitarsInCart,
}

type ChangeDiscountAction = {
  type: ActionType.ChangeDiscount,
  payload: number,
}

type IsDataLoadedAction = {
  type: ActionType.IsDataLoaded,
  payload: boolean,
}

type IsGuitarLoadedAction = {
  type: ActionType.IsGuitarLoaded,
  payload: boolean,
}

type IsCommentPostedAction = {
  type: ActionType.IsCommentPosted,
  payload: boolean,
}

type IsCouponPostedAction = {
  type: ActionType.IsCouponPosted,
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

type Actions = LoadGuitarsAction | LoadGuitarAction | ChangeGuitarsInCartAction | ChangeDiscountAction | IsDataLoadedAction | IsGuitarLoadedAction | IsCommentPostedAction | IsCouponPostedAction | ChangeSortingAction | ChangeSortingDirectionAction | ChangeMinPriceAction | ChangeMaxPriceAction | ChangeGuitarTypesAction | ChangeGuitarStringsAction | ChangeAvailableStringCountAction | ChangePagesCountAction | ChangeActivePageAction;

export {ActionType};

export type {Actions, ThunkActionResult, ThunkAppDispatch};
