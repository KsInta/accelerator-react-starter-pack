import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Guitars} from '../../types/types';

const getDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;

const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;

export {getDataLoaded, getGuitars};
