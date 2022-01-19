import {ActionType, Actions} from '../../types/actions';
import {FilterProcess} from '../../types/state';
import {MIN_PRICE, MAX_PRICE, availableStringCountByTypes} from '../../const';

const initialState: FilterProcess = {
  minPrice: MIN_PRICE,
  maxPrice: MAX_PRICE,
  guitarTypes: [],
  guitarStrings: [],
  availableStringCount: availableStringCountByTypes,
};

const filterProcess = (state = initialState, action: Actions): FilterProcess => {
  switch (action.type) {
    case ActionType.ChangeMinPrice:
      return {...state, minPrice: action.payload};
    case ActionType.ChangeMaxPrice:
      return {...state, maxPrice: action.payload};
    case ActionType.ChangeGuitarTypes:
      return {...state, guitarTypes: action.payload};
    case ActionType.ChangeGuitarStrings:
      return {...state, guitarStrings: action.payload};
    case ActionType.ChangeAvailableStringCount:
      return {...state, availableStringCount: action.payload};
    default:
      return state;
  }
};

export {filterProcess};
