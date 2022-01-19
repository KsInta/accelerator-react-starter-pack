import {ActionType, Actions} from '../../types/actions';
import {OptionProcess} from '../../types/state';
import {SortType, SortDirection} from '../../const';

const initialState: OptionProcess = {
  sortType: SortType.Default,
  sortDirection: SortDirection.Default,
  activePage: 1,
};

const optionProcess = (state = initialState, action: Actions): OptionProcess => {
  switch (action.type) {
    case ActionType.ChangeSorting:
      return {...state, sortType: action.payload};
    case ActionType.ChangeSortingDirection:
      return {...state, sortDirection: action.payload};
    case ActionType.ChangeActivePage:
      return {...state, activePage: action.payload};
    default:
      return state;
  }
};

export {optionProcess};
