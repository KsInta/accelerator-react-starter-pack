import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Guitar, Guitars} from '../../types/types';

const getDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;

const getGuitarLoaded = (state: State): boolean => state[NameSpace.data].isGuitarLoaded;

const getCommentPosted = (state: State): boolean => state[NameSpace.data].isCommentPosted;

const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;

const getGuitar = (state: State): Guitar => state[NameSpace.data].guitar;

export {getDataLoaded, getCommentPosted, getGuitars, getGuitar, getGuitarLoaded};
