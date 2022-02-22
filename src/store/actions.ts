import {ActionType, Actions} from '../types/actions';
import {Guitar, GuitarsBranch, GuitarsInCart} from '../types/types';
import {SortType, SortDirection} from '../const';

const loadGuitars = (guitars: GuitarsBranch): Actions => ({
  type: ActionType.LoadGuitars,
  payload: guitars,
});

const loadGuitar = (guitar: Guitar): Actions => ({
  type: ActionType.LoadGuitar,
  payload: guitar,
});

const changeGuitarsInCart = (guitarsInCart: GuitarsInCart): Actions => ({
  type: ActionType.ChangeGuitarsInCart,
  payload: guitarsInCart,
});

const changeDiscount = (discount: number): Actions => ({
  type: ActionType.ChangeDiscount,
  payload: discount,
});

const toggleIsLoading = (isLoading: boolean): Actions => ({
  type: ActionType.IsDataLoaded,
  payload: isLoading,
});

const toggleIsGuitarLoading = (isGuitarLoading: boolean): Actions => ({
  type: ActionType.IsGuitarLoaded,
  payload: isGuitarLoading,
});

const toggleIsPosting = (isCommentPosting: boolean): Actions => ({
  type: ActionType.IsCommentPosted,
  payload: isCommentPosting,
});

const toggleIsPostingCoupon = (isCouponPosting: boolean): Actions => ({
  type: ActionType.IsCouponPosted,
  payload: isCouponPosting,
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

export {loadGuitars, loadGuitar, changeGuitarsInCart, changeDiscount, toggleIsLoading, toggleIsGuitarLoading, toggleIsPosting, toggleIsPostingCoupon, changeSorting, changeSortingDirection, changeMinPrice, changeMaxPrice, changeGuitarTypes, changeGuitarStrings, changeAvailableStringCount, changeActivePage};
