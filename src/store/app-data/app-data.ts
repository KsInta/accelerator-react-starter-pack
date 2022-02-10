import {ActionType, Actions} from '../../types/actions';
import {AppData} from '../../types/state';
import {Guitar} from '../../types/types';

const initialState: AppData = {
  guitars: [],
  guitar: {} as Guitar,
  isDataLoaded: false,
  isGuitarLoaded: false,
  isCommentPosted: false,
};

const appData = (state = initialState, action: Actions): AppData => {
  switch (action.type) {
    case ActionType.LoadGuitars:
      return {...state, guitars: action.payload};
    case ActionType.LoadGuitar:
      return {...state, guitar: action.payload};
    case ActionType.IsDataLoaded:
      return {...state, isDataLoaded: action.payload};
    case ActionType.IsGuitarLoaded:
      return {...state, isGuitarLoaded: action.payload};
    case ActionType.IsCommentPosted:
      return {...state, isCommentPosted: action.payload};
    default:
      return state;
  }
};

export {appData};
