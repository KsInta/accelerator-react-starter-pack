import {combineReducers} from 'redux';
import {appData} from './app-data/app-data';
import {optionProcess} from './option-process/option-process';
import {filterProcess} from './filter-process/filter-process';

export enum NameSpace {
  data = 'DATA',
  option = 'OPTION',
  filter = 'FILTER',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: appData,
  [NameSpace.option]: optionProcess,
  [NameSpace.filter]: filterProcess,
});

type RootState = ReturnType<typeof rootReducer>;

export type {RootState};
