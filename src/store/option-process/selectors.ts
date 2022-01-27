import {SortType, SortDirection} from '../../const';
import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';

const getSortType = (state: State): SortType => state[NameSpace.option].sortType;

const getSortDirtection = (state: State): SortDirection => state[NameSpace.option].sortDirection;

const getActivePage = (state: State): number => state[NameSpace.option].activePage;

export {getSortType, getSortDirtection, getActivePage};
