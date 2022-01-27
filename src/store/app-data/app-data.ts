import {ActionType, Actions} from '../../types/actions';
import {AppData} from '../../types/state';

const initialState: AppData = {
  guitars: [],
  isDataLoaded: true,
};

const appData = (state = initialState, action: Actions): AppData => {
  switch (action.type) {
    case ActionType.LoadGuitars:
      return {...state, guitars: action.payload};
    case ActionType.IsDataLoaded:
      return {...state, isDataLoaded: action.payload};
    default:
      return state;
  }
};

export {appData};
