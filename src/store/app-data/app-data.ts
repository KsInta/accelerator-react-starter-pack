import {ActionType, Actions} from '../../types/actions';
import {AppData} from '../../types/state';
import {Guitar, GuitarsBranch, GuitarsInCart} from '../../types/types';
import {BASIC_DISCOUNT} from '../../const';

const initialState: AppData = {
  guitars: {} as GuitarsBranch,
  guitar: {} as Guitar,
  guitarsInCart: {} as GuitarsInCart,
  discount: BASIC_DISCOUNT,
  isDataLoaded: false,
  isGuitarLoaded: false,
  isCommentPosted: false,
  isCouponPosted: false,
};

const appData = (state = initialState, action: Actions): AppData => {
  switch (action.type) {
    case ActionType.LoadGuitars:
      return {...state, guitars: action.payload};
    case ActionType.LoadGuitar:
      return {...state, guitar: action.payload};
    case ActionType.ChangeGuitarsInCart:
      return {...state, guitarsInCart: action.payload};
    case ActionType.ChangeDiscount:
      return {...state, discount: action.payload};
    case ActionType.IsDataLoaded:
      return {...state, isDataLoaded: action.payload};
    case ActionType.IsGuitarLoaded:
      return {...state, isGuitarLoaded: action.payload};
    case ActionType.IsCommentPosted:
      return {...state, isCommentPosted: action.payload};
    case ActionType.IsCouponPosted:
      return {...state, isCouponPosted: action.payload};
    default:
      return state;
  }
};

export {appData};
