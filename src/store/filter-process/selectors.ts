import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';

const getMinPrice = (state: State): number | string => state[NameSpace.filter].minPrice;

const getMaxPrice = (state: State): number | string => state[NameSpace.filter].maxPrice;

const getGuitarTypes = (state: State): Array<string> => state[NameSpace.filter].guitarTypes;

const getGuitarStrings = (state: State): Array<string> => state[NameSpace.filter].guitarStrings;

const getAvailableGuitarStringCount = (state: State): Array<string> => state[NameSpace.filter].availableStringCount;

export {getMinPrice, getMaxPrice, getGuitarTypes, getGuitarStrings, getAvailableGuitarStringCount};
