import {SortType, SortDirection} from '../../const';
import {OptionProcess} from '../../types/state';
import {optionProcess} from './option-process';
import {changeSorting, changeSortingDirection, changeActivePage} from '../actions';
import {FIRST_PAGE} from '../../const';

const ACTIVE_PAGE = 2;

const initialState: OptionProcess = {
  sortType: SortType.Default,
  sortDirection: SortDirection.Default,
  activePage: FIRST_PAGE,
};

describe('Reducer: optionProcess', () => {
  const state = initialState;
  it('should change activePage by changeActivePage', () => {
    expect(optionProcess(state, changeActivePage(ACTIVE_PAGE)))
      .toEqual({...state, activePage: ACTIVE_PAGE});
  });
  it('should change sortType by changeSorting', () => {
    expect(optionProcess(state, changeSorting(SortType.Price)))
      .toEqual({...state, sortType: SortType.Price});
  });
  it('should change sortDirection by changeSortingDirection', () => {
    expect(optionProcess(state, changeSortingDirection(SortDirection.Ascension)))
      .toEqual({...state, sortDirection: SortDirection.Ascension});
  });
});
