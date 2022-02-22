import {NameSpace} from '../root-reducer';
import {State} from '../../types/state';
import {Guitar, GuitarsBranch, GuitarsInCart} from '../../types/types';

const getDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;

const getGuitarLoaded = (state: State): boolean => state[NameSpace.data].isGuitarLoaded;

const getCommentPosted = (state: State): boolean => state[NameSpace.data].isCommentPosted;

const getCouponPosted = (state: State): boolean => state[NameSpace.data].isCouponPosted;

const getGuitars = (state: State): GuitarsBranch => state[NameSpace.data].guitars;

const getGuitar = (state: State): Guitar => state[NameSpace.data].guitar;

const getGuitarsInCart = (state: State): GuitarsInCart => state[NameSpace.data].guitarsInCart;

const getDiscount = (state: State): number => state[NameSpace.data].discount;

export {getDataLoaded, getCommentPosted, getCouponPosted, getGuitars, getGuitar, getGuitarLoaded, getGuitarsInCart, getDiscount};
