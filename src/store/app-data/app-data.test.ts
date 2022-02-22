import {AppData} from '../../types/state';
import {appData} from './app-data';
import {loadGuitar, loadGuitars, changeGuitarsInCart, changeDiscount, toggleIsLoading, toggleIsGuitarLoading, toggleIsPosting, toggleIsPostingCoupon} from '../actions';
import {GenerateFakeGuitar} from '../../mock/mock';
import {Guitar, GuitarsBranch, GuitarsInCart} from '../../types/types';
import {BASIC_DISCOUNT} from '../../const';

const GUITAR_COUNT = 25;

const initialState: AppData = {
  guitars: {} as GuitarsBranch,
  guitar: {} as Guitar,
  guitarsInCart: {} as GuitarsInCart,
  discount: BASIC_DISCOUNT,
  isDataLoaded: false,
  isGuitarLoaded: false,
  isCommentPosted: false,
  isCouponPosted: false,
};

const fakeGuitar = GenerateFakeGuitar();

const guitarsInCart = {
  3: 2,
  6: 3,
};

const discount = 25;

const fakeGuitars = new Array(GUITAR_COUNT).fill(null).map((guitar, index) => guitar = {...GenerateFakeGuitar(), id: index});
const normalizedData = fakeGuitars.reduce<GuitarsBranch>((acc, item: Guitar) => {
  acc[item.id] = item;
  return acc;
}, {});

describe('Reducer: appData', () => {
  const state = initialState;
  it('should update guitars by loadGuitars', () => {
    expect(appData(state, loadGuitars(normalizedData)))
      .toEqual({ ...state, guitars: normalizedData});
  });
  it('should update guitar by loadGuitar', () => {
    expect(appData(state, loadGuitar(fakeGuitar)))
      .toEqual({ ...state, guitar: fakeGuitar});
  });
  it('should change guitarInCart by changeGuitarsInCart', () => {
    expect(appData(state, changeGuitarsInCart(guitarsInCart)))
      .toEqual({ ...state, guitarsInCart});
  });
  it('should change discount by changeDiscount', () => {
    expect(appData(state, changeDiscount(discount)))
      .toEqual({ ...state, discount});
  });
  it('should change isDataLoaded by toggleIsLoading', () => {
    const isDataLoaded = true;
    expect(appData(state, toggleIsLoading(isDataLoaded)))
      .toEqual({...state, isDataLoaded});
  });
  it('should change isGuitarLoaded by toggleIsGuitarLoading', () => {
    const isGuitarLoaded = true;
    expect(appData(state, toggleIsGuitarLoading(isGuitarLoaded)))
      .toEqual({...state, isGuitarLoaded});
  });
  it('should change isCommentPosted by toggleIsPosting', () => {
    const isCommentPosted = true;
    expect(appData(state, toggleIsPosting(isCommentPosted)))
      .toEqual({...state, isCommentPosted});
  });
  it('should change isCouponPosted by toggleIsPostingCoupon', () => {
    const isCouponPosted = true;
    expect(appData(state, toggleIsPostingCoupon(isCouponPosted)))
      .toEqual({...state, isCouponPosted});
  });
});
